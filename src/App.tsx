import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchBarModal } from './components/SearchBarModal';
import { NoteViewerModal } from './components/NoteViewerModal';

// Auth Provider
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { CppPlaygroundPage } from './pages/CppPlaygroundPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizActivePage } from './pages/QuizActivePage';
import { NotesPage } from './pages/NotesPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';

import { ALL_SUBJECTS } from './data/subjectsData';
import { ALL_NOTES } from './data/notesData';
import { NoteItem, SubjectId } from './types';
import { setLastVisitedSubject } from './services/storageService';

function MainApp() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('pf-theory');
  const currentSubjectObj = ALL_SUBJECTS.find((s) => s.id === selectedSubjectId) || ALL_SUBJECTS[0];
  const [activeQuizSubjectId, setActiveQuizSubjectId] = useState<string>('pf-theory');
  const [activeNote, setActiveNote] = useState<NoteItem | null>(null);
  const [selectedPlaygroundTopicId, setSelectedPlaygroundTopicId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auth flow states
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [authNoticeMessage, setAuthNoticeMessage] = useState<string | undefined>(undefined);
  const [previousTab, setPreviousTab] = useState<string>('home');

  // Handle URL hash changes for direct linking & search engine crawlable sections
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = [
        'home',
        'courses',
        'quizzes',
        'notes',
        'cpp-playground',
        'about',
        'dashboard'
      ];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync document title and URL hash with active view
  useEffect(() => {
    switch (currentTab) {
      case 'home':
        document.title = 'Habib BSCS Students | Complete BSCS Learning Platform';
        break;
      case 'courses':
        document.title = 'Courses & Syllabi | Habib BSCS Students';
        break;
      case 'subject-detail':
        document.title = `${currentSubjectObj.name} | Habib BSCS Students`;
        break;
      case 'quizzes':
        document.title = '15-MCQ Online Quizzes | Habib BSCS Students';
        break;
      case 'quiz-active':
        document.title = `Examination: ${activeQuizSubjectId.toUpperCase()} | Habib BSCS Students`;
        break;
      case 'notes':
        document.title = 'Study Notes & Cheat Sheets | Habib BSCS Students';
        break;
      case 'cpp-playground':
        document.title = 'Interactive C++ Playground | Habib BSCS Students';
        break;
      case 'about':
        document.title = 'About & Curriculum Overview | Habib BSCS Students';
        break;
      case 'dashboard':
        document.title = 'Student Dashboard | Habib BSCS Students';
        break;
      case 'auth':
        document.title = 'Sign In & Register | Habib BSCS Students';
        break;
      default:
        document.title = 'Habib BSCS Students | Complete BSCS Learning Platform';
    }

    if (currentTab !== 'subject-detail' && currentTab !== 'quiz-active' && currentTab !== 'auth') {
      if (currentTab === 'home') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = currentTab;
      }
    }
  }, [currentTab, currentSubjectObj.name, activeQuizSubjectId]);

  // Global Ctrl+K / Cmd+K search listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openAuth = (mode: 'signin' | 'signup' = 'signin', message?: string) => {
    setPreviousTab(currentTab === 'auth' ? 'dashboard' : currentTab);
    setAuthMode(mode);
    setAuthNoticeMessage(message);
    setCurrentTab('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subject selection handler
  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setLastVisitedSubject(subjectId as SubjectId, user?.uid);
    setCurrentTab('subject-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Quiz handler
  const handleStartQuiz = (subjectId: string) => {
    setActiveQuizSubjectId(subjectId);
    setCurrentTab('quiz-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View notes for specific subject
  const handleViewNotesForSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open C++ playground at specific topic
  const handleOpenPlaygroundTopic = (topicId: string) => {
    setSelectedPlaygroundTopicId(topicId);
    setCurrentTab('cpp-playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open note reader modal
  const handleOpenNote = (note: NoteItem) => {
    setActiveNote(note);
  };

  const handleSelectNoteFromSearch = (noteId: string) => {
    const found = ALL_NOTES.find((n) => n.id === noteId);
    if (found) {
      setActiveNote(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(mode) => openAuth(mode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSubject={handleSelectSubject}
            onTakeQuiz={handleStartQuiz}
            onViewNotes={handleViewNotesForSubject}
            onOpenAuth={(mode) => openAuth(mode)}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesPage
            onSelectSubject={handleSelectSubject}
            onTakeQuiz={handleStartQuiz}
            onViewNotes={handleViewNotesForSubject}
          />
        )}

        {currentTab === 'subject-detail' && (
          <SubjectDetailPage
            subject={currentSubjectObj}
            onBack={() => {
              setCurrentTab('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTakeQuiz={handleStartQuiz}
            onViewNotes={handleViewNotesForSubject}
          />
        )}

        {currentTab === 'cpp-playground' && (
          <CppPlaygroundPage initialTopicId={selectedPlaygroundTopicId} />
        )}

        {currentTab === 'quizzes' && (
          <QuizzesPage
            onStartQuiz={handleStartQuiz}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {currentTab === 'quiz-active' && (
          <QuizActivePage
            subjectId={activeQuizSubjectId}
            onBackToCourse={handleSelectSubject}
            onBackToQuizzes={() => {
              setCurrentTab('quizzes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'notes' && (
          <NotesPage
            onOpenNote={handleOpenNote}
            filterSubjectId={selectedSubjectId}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSubject={handleSelectSubject}
            onStartQuiz={handleStartQuiz}
            onOpenNote={handleOpenNote}
            onOpenAuth={(mode) =>
              openAuth(
                mode,
                'Sign in or create an account to access your personal study dashboard and cloud-saved quiz results.'
              )
            }
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'auth' && (
          <AuthPage
            initialMode={authMode}
            intendedActionMessage={authNoticeMessage}
            onSuccess={() => {
              setCurrentTab(previousTab === 'auth' ? 'dashboard' : previousTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setCurrentTab(previousTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectSubject={handleSelectSubject}
      />

      {/* Floating WhatsApp Button on ALL pages */}
      <FloatingWhatsApp />

      {/* Global Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSubject={handleSelectSubject}
        onSelectNote={handleSelectNoteFromSearch}
        onOpenPlaygroundTopic={handleOpenPlaygroundTopic}
      />

      {/* Note Reader Modal */}
      <NoteViewerModal
        note={activeNote}
        onClose={() => setActiveNote(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
