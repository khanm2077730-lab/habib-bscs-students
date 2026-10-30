import { StudentProgress, QuizAttempt, SubjectId } from '../types';
import {
  saveStudentQuizAttempt,
  saveCompletedLessonToFirestore,
  toggleBookmarkInFirestore,
  loadAllStudentDataFromFirestore
} from './firestoreService';
import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const GUEST_STORAGE_KEY = 'habib_bscs_guest_progress';
const getUserStorageKey = (uid?: string): string =>
  uid ? `habib_bscs_user_progress_${uid}` : GUEST_STORAGE_KEY;

export const defaultGuestProgress: StudentProgress = {
  completedLessons: ['pf-l1-1'],
  quizAttempts: {} as Record<SubjectId, QuizAttempt>,
  bookmarkedNotes: ['note-pf-01', 'note-calc-cheatsheet'],
  lastVisitedSubject: 'pf-theory'
};

export const emptyStudentProgress: StudentProgress = {
  completedLessons: [],
  quizAttempts: {} as Record<SubjectId, QuizAttempt>,
  bookmarkedNotes: [],
  lastVisitedSubject: 'pf-theory'
};

/**
 * Returns student progress scoped to the authenticated UID or guest session
 */
export const getStudentProgress = (uid?: string): StudentProgress => {
  const key = getUserStorageKey(uid);
  const fallback = uid ? emptyStudentProgress : defaultGuestProgress;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      completedLessons: parsed.completedLessons || fallback.completedLessons,
      quizAttempts: parsed.quizAttempts || {},
      bookmarkedNotes: parsed.bookmarkedNotes || fallback.bookmarkedNotes,
      lastVisitedSubject: parsed.lastVisitedSubject || 'pf-theory'
    };
  } catch (err) {
    console.warn(`Error reading student progress for [${key}]:`, err);
    return fallback;
  }
};

/**
 * Saves student progress strictly scoped to the specified UID or guest session
 */
export const saveStudentProgress = (progress: StudentProgress, uid?: string): void => {
  const key = getUserStorageKey(uid);
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (err) {
    console.error(`Error saving student progress for [${key}]:`, err);
  }
};

/**
 * Clears cached data for a specific user or guest session
 */
export const clearUserSessionCache = (uid?: string): void => {
  try {
    const key = getUserStorageKey(uid);
    localStorage.removeItem(key);
  } catch (err) {
    console.warn('Error clearing session cache:', err);
  }
};

/**
 * Loads student records directly from Cloud Firestore for an authenticated user.
 * Guarantees zero cross-user pollution: if new user, initializes an isolated empty container.
 */
export const fetchUserProgressFromFirestore = async (
  uid: string
): Promise<StudentProgress> => {
  try {
    const cloudData = await loadAllStudentDataFromFirestore(uid);

    const hasCloudRecords =
      Object.keys(cloudData.quizAttempts).length > 0 ||
      cloudData.completedLessons.length > 0 ||
      cloudData.bookmarkedNotes.length > 0;

    if (hasCloudRecords) {
      const merged: StudentProgress = {
        completedLessons: cloudData.completedLessons || [],
        quizAttempts: cloudData.quizAttempts as Record<SubjectId, QuizAttempt>,
        bookmarkedNotes: cloudData.bookmarkedNotes || [],
        lastVisitedSubject: 'pf-theory'
      };
      saveStudentProgress(merged, uid);
      return merged;
    } else {
      // First sign-in for this user: initialize clean empty records
      const freshUserProgress: StudentProgress = {
        completedLessons: [],
        quizAttempts: {} as Record<SubjectId, QuizAttempt>,
        bookmarkedNotes: [],
        lastVisitedSubject: 'pf-theory'
      };
      saveStudentProgress(freshUserProgress, uid);
      await syncUserProgressToFirestore(uid, freshUserProgress);
      return freshUserProgress;
    }
  } catch (err) {
    console.warn('Could not read user progress from Cloud Firestore, falling back to local UID cache:', err);
    return getStudentProgress(uid);
  }
};

/**
 * Synchronizes user data to Cloud Firestore under /users/{uid}/...
 */
export const syncUserProgressToFirestore = async (
  uid: string,
  progress: StudentProgress
): Promise<void> => {
  try {
    // 1. Sync quiz attempts to subcollection /users/{uid}/quiz_attempts
    const quizPromises = Object.values(progress.quizAttempts).map((attempt) =>
      saveStudentQuizAttempt(uid, attempt).catch((e) =>
        console.warn('Failed saving quiz attempt to Firestore:', e)
      )
    );

    // 2. Sync completed lessons to subcollection /users/{uid}/completed_lessons
    const lessonPromises = progress.completedLessons.map((lessonId) =>
      saveCompletedLessonToFirestore(uid, lessonId).catch((e) =>
        console.warn('Failed saving lesson completion to Firestore:', e)
      )
    );

    // 3. Sync summary document /users/{uid}/data/progress
    const summaryPromise = setDoc(
      doc(db, 'users', uid, 'data', 'progress'),
      {
        completedLessons: progress.completedLessons,
        quizAttempts: progress.quizAttempts,
        bookmarkedNotes: progress.bookmarkedNotes,
        lastVisitedSubject: progress.lastVisitedSubject || 'pf-theory',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    await Promise.all([...quizPromises, ...lessonPromises, summaryPromise]);
  } catch (err) {
    console.warn('Failed syncing progress to Cloud Firestore:', err);
  }
};

/**
 * Mark lesson as complete and write directly to Cloud Firestore
 */
export const markLessonComplete = (
  lessonId: string,
  userUid?: string
): StudentProgress => {
  const current = getStudentProgress(userUid);
  if (!current.completedLessons.includes(lessonId)) {
    const updated: StudentProgress = {
      ...current,
      completedLessons: [...current.completedLessons, lessonId]
    };
    saveStudentProgress(updated, userUid);

    if (userUid) {
      saveCompletedLessonToFirestore(userUid, lessonId).catch((err) =>
        console.warn('Failed saving lesson to Firestore:', err)
      );
      setDoc(
        doc(db, 'users', userUid, 'data', 'progress'),
        { completedLessons: updated.completedLessons, updatedAt: serverTimestamp() },
        { merge: true }
      ).catch(() => {});
    }

    return updated;
  }
  return current;
};

/**
 * Save quiz results directly to Cloud Firestore subcollection
 */
export const saveQuizResult = (
  attempt: QuizAttempt,
  userUid?: string
): StudentProgress => {
  const current = getStudentProgress(userUid);
  const updated: StudentProgress = {
    ...current,
    quizAttempts: {
      ...current.quizAttempts,
      [attempt.subjectId]: attempt
    }
  };
  saveStudentProgress(updated, userUid);

  if (userUid) {
    // Write directly to subcollection /users/{uid}/quiz_attempts/{subjectId}
    saveStudentQuizAttempt(userUid, attempt).catch((err) =>
      console.warn('Failed saving quiz attempt to Firestore subcollection:', err)
    );
    // Also update summary doc
    setDoc(
      doc(db, 'users', userUid, 'data', 'progress'),
      { quizAttempts: updated.quizAttempts, updatedAt: serverTimestamp() },
      { merge: true }
    ).catch(() => {});
  }

  return updated;
};

/**
 * Toggle bookmark directly in Cloud Firestore
 */
export const toggleBookmarkNote = (
  noteId: string,
  userUid?: string
): StudentProgress => {
  const current = getStudentProgress(userUid);
  const exists = current.bookmarkedNotes.includes(noteId);
  const updated: StudentProgress = {
    ...current,
    bookmarkedNotes: exists
      ? current.bookmarkedNotes.filter((id) => id !== noteId)
      : [...current.bookmarkedNotes, noteId]
  };
  saveStudentProgress(updated, userUid);

  if (userUid) {
    toggleBookmarkInFirestore(userUid, noteId, exists).catch((err) =>
      console.warn('Failed updating bookmark in Firestore:', err)
    );
    setDoc(
      doc(db, 'users', userUid, 'data', 'progress'),
      { bookmarkedNotes: updated.bookmarkedNotes, updatedAt: serverTimestamp() },
      { merge: true }
    ).catch(() => {});
  }

  return updated;
};

/**
 * Set and persist the last visited subject
 */
export const setLastVisitedSubject = (
  subjectId: SubjectId,
  userUid?: string
): void => {
  const current = getStudentProgress(userUid);
  const updated = { ...current, lastVisitedSubject: subjectId };
  saveStudentProgress(updated, userUid);
  if (userUid) {
    setDoc(
      doc(db, 'users', userUid, 'data', 'progress'),
      { lastVisitedSubject: subjectId, updatedAt: serverTimestamp() },
      { merge: true }
    ).catch(() => {});
  }
};
