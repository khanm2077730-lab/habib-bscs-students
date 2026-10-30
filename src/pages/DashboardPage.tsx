import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  HelpCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Database,
  ExternalLink,
  Code2,
  Terminal,
  ShieldCheck,
  ChevronRight,
  User as UserIcon,
  LogOut,
  Lock,
  Cloud,
  Check,
  RefreshCw,
  AlertTriangle,
  Server
} from 'lucide-react';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { ALL_QUIZZES } from '../data/quizzesData';
import { ALL_NOTES } from '../data/notesData';
import {
  getStudentProgress,
  fetchUserProgressFromFirestore
} from '../services/storageService';
import {
  testFirestoreConnection,
  testFirestoreUserWrite,
  FirestoreConnectionResult
} from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';
import { NoteItem, StudentProgress } from '../types';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
  onSelectSubject: (subjectId: string) => void;
  onStartQuiz: (subjectId: string) => void;
  onOpenNote: (note: NoteItem) => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectSubject,
  onStartQuiz,
  onOpenNote,
  onOpenAuth
}) => {
  const { user, userProfile, loading, signOut } = useAuth();
  const [progress, setProgress] = useState<StudentProgress>(() => getStudentProgress(user?.uid));
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Firestore connection diagnostic
  const [dbHealth, setDbHealth] = useState<FirestoreConnectionResult | null>(null);
  const [isTestingHealth, setIsTestingHealth] = useState(false);
  const [testSaveMessage, setTestSaveMessage] = useState<string | null>(null);

  // Initial connection test
  useEffect(() => {
    testFirestoreConnection().then((res) => {
      setDbHealth(res);
    });
  }, []);

  // Load progress from Firestore if signed in
  useEffect(() => {
    let mounted = true;
    if (user) {
      setIsSyncing(true);
      fetchUserProgressFromFirestore(user.uid)
        .then((cloudProgress) => {
          if (mounted) {
            setProgress(cloudProgress);
            setIsSyncing(false);
          }
        })
        .catch(() => {
          if (mounted) setIsSyncing(false);
        });
    } else {
      setProgress(getStudentProgress());
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleTestDatabaseWrite = async () => {
    if (!user) return;
    setIsTestingHealth(true);
    setTestSaveMessage(null);
    try {
      await testFirestoreUserWrite(user.uid);
      setTestSaveMessage(
        `✓ Verified: Authenticated write to /users/${user.uid}/diagnostic/connection_test succeeded! Security rules verified without modifying quiz records.`
      );
    } catch (err: any) {
      setTestSaveMessage('✕ Write failed: ' + (err?.message || String(err)));
    } finally {
      setIsTestingHealth(false);
    }
  };

  const handleRefreshConnection = async () => {
    setIsTestingHealth(true);
    const res = await testFirestoreConnection();
    setDbHealth(res);
    setIsTestingHealth(false);
  };

  // While Firebase determines auth state, display a clean loading placeholder
  if (loading) {
    return (
      <div className="py-24 px-4 max-w-md mx-auto text-center space-y-4 animate-in fade-in">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Verifying Student Session</h3>
          <p className="text-xs font-mono text-slate-400">Connecting to Firebase Authentication...</p>
        </div>
      </div>
    );
  }

  // If user is unauthenticated, show protected gateway requiring login
  if (!user) {
    return (
      <div className="py-12 px-4 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-200">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mx-auto shadow-lg shadow-blue-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-mono font-bold border border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Protected Student Area</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Student Dashboard Sign In
            </h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Please sign in or create an account to view your private Cloud Firestore study dashboard, saved 15-MCQ quiz records, and cloud-synced course progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenAuth('signin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>Sign In with Email</span>
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all"
            >
              <span>Create BSCS Account</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
            <p className="font-semibold text-slate-300">
              Public courses, C++ playground, and notes remain accessible to everyone:
            </p>
            <button
              onClick={() => onNavigate('courses')}
              className="text-blue-400 hover:text-blue-300 underline font-medium"
            >
              Continue Browsing Courses &amp; Notes as Guest →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard View
  const totalCourses = ALL_SUBJECTS.length; // 8
  const completedLessonsCount = progress.completedLessons.length;
  const quizAttemptsList = Object.values(progress.quizAttempts);
  const averagePercentage =
    quizAttemptsList.length > 0
      ? Math.round(
          quizAttemptsList.reduce((acc, curr) => acc + curr.percentage, 0) /
            quizAttemptsList.length
        )
      : 0;

  const bookmarkedNotesList = ALL_NOTES.filter((n) =>
    progress.bookmarkedNotes.includes(n.id)
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Profile & Sync Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg shrink-0">
              {(userProfile?.displayName || user.displayName || 'BS')
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Authenticated Student</span>
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <Cloud className="w-3.5 h-3.5" />
                  <span>{isSyncing ? 'Syncing...' : 'Cloud Firestore Active'}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {userProfile?.displayName || user.displayName || 'BSCS Student'}
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Email: {user.email} {userProfile?.rollNumber && `• Student ID: ${userProfile.rollNumber}`}
              </p>
              <p className="text-[11px] font-mono text-slate-500">
                Firebase UID: <span className="text-slate-400">{user.uid}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowConfigModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Firebase Guide</span>
            </button>

            <button
              onClick={async () => {
                await signOut();
                onNavigate('home');
              }}
              className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-bold border border-red-800/80 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Live Cloud Firestore Connection Status Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Server className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-slate-400 font-mono">Firestore Database: </span>
              <strong className="text-white font-mono">habib-bscs-students</strong>
              <span className="text-slate-500 mx-2">•</span>
              <span
                className={`font-semibold ${
                  dbHealth?.status === 'connected'
                    ? 'text-emerald-400'
                    : dbHealth?.status === 'not-created'
                    ? 'text-yellow-400'
                    : 'text-slate-300'
                }`}
              >
                {dbHealth?.message || 'Checking database...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshConnection}
              disabled={isTestingHealth}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isTestingHealth ? 'animate-spin' : ''}`} />
              <span>Check Status</span>
            </button>

            <button
              onClick={handleTestDatabaseWrite}
              disabled={isTestingHealth}
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono font-bold transition-all shadow-sm"
            >
              Test Cloud Save
            </button>
          </div>
        </div>

        {testSaveMessage && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 animate-in fade-in">
            {testSaveMessage}
          </div>
        )}
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400 block">Available Courses</span>
          <span className="text-3xl font-black text-white">{totalCourses}</span>
          <span className="text-[11px] text-slate-400 block">4 Theory + 4 Labs</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400 block">Lessons Completed</span>
          <span className="text-3xl font-black text-cyan-400">{completedLessonsCount}</span>
          <span className="text-[11px] text-slate-400 block">Saved in Cloud Firestore</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400 block">Quizzes Attempted</span>
          <span className="text-3xl font-black text-yellow-400">{quizAttemptsList.length} / 8</span>
          <span className="text-[11px] text-slate-400 block">15 MCQs per subject</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-xs font-mono uppercase text-slate-400 block">Average Quiz Score</span>
          <span className="text-3xl font-black text-emerald-400">{averagePercentage}%</span>
          <span className="text-[11px] text-slate-400 block">Out of 15 Marks max</span>
        </div>
      </div>

      {/* Two Column Layout: Quiz History & Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quiz Scores & Progress */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Saved Quiz Records (Cloud Firestore)</span>
            </h3>
            <button
              onClick={() => onNavigate('quizzes')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              All Quizzes →
            </button>
          </div>

          {quizAttemptsList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-3">
              <HelpCircle className="w-8 h-8 text-yellow-500/60 mx-auto" />
              <p className="text-sm font-semibold text-slate-200">No quizzes attempted yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Take any 15-MCQ quiz. Your score out of 15 and percentage will be automatically saved to your private Cloud Firestore document.
              </p>
              <button
                onClick={() => onNavigate('quizzes')}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs rounded-xl"
              >
                Launch First Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {quizAttemptsList.map((attempt) => (
                <div
                  key={attempt.subjectId}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Submitted: {attempt.date}
                    </span>
                    <h4 className="text-sm font-bold text-white">{attempt.subjectName}</h4>
                    <span className="text-xs font-mono text-slate-300">
                      Score: <strong className="text-white">{attempt.score}/15</strong> ({attempt.percentage}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                        attempt.passed
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {attempt.passed ? 'PASSED ✓' : 'REVIEW'}
                    </span>

                    <button
                      onClick={() => onStartQuiz(attempt.subjectId)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Retake Quiz"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Learning Links */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-800/40 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recommended Next Steps</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => onNavigate('cpp-playground')}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 group-hover:text-white font-semibold">
                    C++ Code Playground
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button
                onClick={() => onNavigate('courses')}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-200 group-hover:text-white font-semibold">
                    Explore BSCS Courses
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Bookmarked Notes & Saved Guides */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Saved Notes (Firestore)</span>
            </h3>
            <button
              onClick={() => onNavigate('notes')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              Browse Library →
            </button>
          </div>

          {bookmarkedNotesList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-2">
              <p className="text-sm font-semibold text-slate-200">No notes saved to your account</p>
              <p className="text-xs text-slate-400">
                Click the bookmark ribbon icon on any note in the Library to save it directly to your Cloud Firestore records.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedNotesList.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onOpenNote(note)}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      {note.category.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{note.fileSize}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{note.chapter}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FIREBASE CONFIG & SECURITY RULES MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Firebase Cloud Firestore Setup Guide</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Project ID: habib-bscs-students
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowConfigModal(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-white block">Step 1: Create Firestore Database (If not created)</strong>
                <ol className="list-decimal pl-5 space-y-1 text-slate-300 text-xs">
                  <li>Open <a href="https://console.firebase.google.com/project/habib-bscs-students/firestore" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-mono">Firebase Console &gt; Firestore Database</a></li>
                  <li>Click <strong>&quot;Create database&quot;</strong></li>
                  <li>Choose your location (e.g. <code>nam5 (us-central)</code> or nearest region)</li>
                  <li>Start in <strong>Production mode</strong> and click <strong>Create</strong></li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-white block">Step 2: Deploy Security Rules</strong>
                <p className="text-xs text-slate-400">
                  Open the <strong>Rules</strong> tab in your Firestore Database and paste the contents of your <code className="text-white">firestore.rules</code> file:
                </p>
                <pre className="p-3 rounded-xl bg-black border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /{subcollection=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <strong className="text-white block">Step 3: Enable Email/Password Auth</strong>
                <p className="text-xs text-slate-400">
                  In <a href="https://console.firebase.google.com/project/habib-bscs-students/authentication/providers" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-mono">Authentication &gt; Sign-in method</a>, enable <strong>Email/Password</strong> so your students can register and sign in.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
