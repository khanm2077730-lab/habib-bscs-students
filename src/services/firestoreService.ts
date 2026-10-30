import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { QuizAttempt, SubjectId } from '../types';
import { UserProfile } from '../context/AuthContext';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface FirestoreConnectionResult {
  status: 'connected' | 'not-created' | 'permission-denied' | 'offline' | 'error';
  message: string;
}

/**
 * Validates connection to Cloud Firestore
 */
export async function testFirestoreConnection(): Promise<FirestoreConnectionResult> {
  const testPath = 'test/connection';
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return {
      status: 'connected',
      message: 'Cloud Firestore is online and responding.'
    };
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('the client is offline')) {
      return {
        status: 'offline',
        message: 'The Firestore client is offline or network is disconnected.'
      };
    }
    if (msg.includes('permission-denied') || msg.includes('Missing or insufficient permissions')) {
      // Permission denied on test/connection is expected if security rules default-deny public docs!
      // This means Firestore IS online and rules are actively enforcing security!
      return {
        status: 'connected',
        message: 'Cloud Firestore is online and security rules are actively enforced.'
      };
    }
    if (msg.includes('failed-precondition') || msg.includes('does not exist') || msg.includes('NOT_FOUND')) {
      return {
        status: 'not-created',
        message: 'Cloud Firestore database has not been created yet in the Firebase Console.'
      };
    }
    return {
      status: 'error',
      message: msg
    };
  }
}

/**
 * Safe write diagnostic for authenticated users that tests write permissions
 * without overwriting any actual student quiz scores or course progress.
 */
export async function testFirestoreUserWrite(uid: string): Promise<boolean> {
  const docPath = `users/${uid}/diagnostic/connection_test`;
  try {
    await setDoc(
      doc(db, 'users', uid, 'diagnostic', 'connection_test'),
      {
        testTimestamp: serverTimestamp(),
        clientTime: new Date().toISOString(),
        verified: true,
        source: 'Habib BSCS Diagnostic Tool'
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * 1. Save or Update Student Profile in Firestore: /users/{uid}
 */
export async function saveStudentProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
  const docPath = `users/${uid}`;
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        ...profile,
        uid,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * 2. Get Student Profile from Firestore: /users/{uid}
 */
export async function getStudentProfile(uid: string): Promise<UserProfile | null> {
  const docPath = `users/${uid}`;
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, docPath);
  }
}

/**
 * 3. Save Quiz Result directly to Firestore: /users/{uid}/quiz_attempts/{subjectId}
 */
export async function saveStudentQuizAttempt(
  uid: string,
  attempt: QuizAttempt
): Promise<void> {
  const docPath = `users/${uid}/quiz_attempts/${attempt.subjectId}`;
  try {
    await setDoc(
      doc(db, 'users', uid, 'quiz_attempts', attempt.subjectId),
      {
        subjectId: attempt.subjectId,
        subjectName: attempt.subjectName,
        score: attempt.score,
        totalQuestions: 15,
        percentage: attempt.percentage,
        passed: attempt.passed,
        date: attempt.date || new Date().toLocaleDateString(),
        userAnswers: attempt.userAnswers,
        timestamp: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * 4. Load all Quiz Results from Firestore: /users/{uid}/quiz_attempts
 */
export async function getStudentQuizAttempts(
  uid: string
): Promise<Record<string, QuizAttempt>> {
  const collectionPath = `users/${uid}/quiz_attempts`;
  try {
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'quiz_attempts'));
    const attempts: Record<string, QuizAttempt> = {};
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      attempts[docSnap.id] = {
        subjectId: data.subjectId as SubjectId,
        subjectName: data.subjectName,
        score: data.score,
        totalQuestions: data.totalQuestions || 15,
        percentage: data.percentage,
        passed: data.passed,
        date: data.date,
        userAnswers: data.userAnswers || {}
      };
    });
    return attempts;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

/**
 * 5. Mark and Save Completed Lesson to Firestore: /users/{uid}/completed_lessons/{lessonId}
 */
export async function saveCompletedLessonToFirestore(
  uid: string,
  lessonId: string
): Promise<void> {
  const docPath = `users/${uid}/completed_lessons/${lessonId}`;
  try {
    await setDoc(
      doc(db, 'users', uid, 'completed_lessons', lessonId),
      {
        lessonId,
        completedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * 6. Load Completed Lessons from Firestore: /users/{uid}/completed_lessons
 */
export async function getCompletedLessonsFromFirestore(
  uid: string
): Promise<string[]> {
  const collectionPath = `users/${uid}/completed_lessons`;
  try {
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'completed_lessons'));
    const lessons: string[] = [];
    querySnapshot.forEach((docSnap) => {
      lessons.push(docSnap.id);
    });
    return lessons;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

/**
 * 7. Toggle Bookmark in Firestore: /users/{uid}/bookmarks/{noteId}
 */
export async function toggleBookmarkInFirestore(
  uid: string,
  noteId: string,
  currentlyBookmarked: boolean
): Promise<void> {
  const docPath = `users/${uid}/bookmarks/${noteId}`;
  try {
    if (currentlyBookmarked) {
      await deleteDoc(doc(db, 'users', uid, 'bookmarks', noteId));
    } else {
      await setDoc(doc(db, 'users', uid, 'bookmarks', noteId), {
        noteId,
        bookmarkedAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, currentlyBookmarked ? OperationType.DELETE : OperationType.WRITE, docPath);
  }
}

/**
 * 8. Load Bookmarks from Firestore: /users/{uid}/bookmarks
 */
export async function getBookmarksFromFirestore(
  uid: string
): Promise<string[]> {
  const collectionPath = `users/${uid}/bookmarks`;
  try {
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'bookmarks'));
    const bookmarks: string[] = [];
    querySnapshot.forEach((docSnap) => {
      bookmarks.push(docSnap.id);
    });
    return bookmarks;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
  }
}

/**
 * 9. Unified loader for all user data from Cloud Firestore
 */
export async function loadAllStudentDataFromFirestore(uid: string): Promise<{
  profile: UserProfile | null;
  quizAttempts: Record<string, QuizAttempt>;
  completedLessons: string[];
  bookmarkedNotes: string[];
}> {
  const [profile, quizAttempts, completedLessons, bookmarkedNotes] = await Promise.all([
    getStudentProfile(uid).catch(() => null),
    getStudentQuizAttempts(uid).catch(() => ({})),
    getCompletedLessonsFromFirestore(uid).catch(() => []),
    getBookmarksFromFirestore(uid).catch(() => [])
  ]);

  return {
    profile,
    quizAttempts,
    completedLessons,
    bookmarkedNotes
  };
}
