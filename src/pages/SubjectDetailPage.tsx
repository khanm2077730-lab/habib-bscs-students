import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  FileText,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Terminal,
  Cpu,
  Wrench,
  Atom,
  FlaskConical,
  LineChart
} from 'lucide-react';
import { Subject, Lesson } from '../types';
import { markLessonComplete, getStudentProgress } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

interface SubjectDetailPageProps {
  subject: Subject;
  onBack: () => void;
  onTakeQuiz: (subjectId: string) => void;
  onViewNotes: (subjectId: string) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({
  subject,
  onBack,
  onTakeQuiz,
  onViewNotes
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'definitions' | 'revision'>('content');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    subject.chapters[0]?.lessons[0] || null
  );
  const [progress, setProgress] = useState(() => getStudentProgress(user?.uid));

  useEffect(() => {
    setProgress(getStudentProgress(user?.uid));
  }, [user]);

  const handleCompleteLesson = (lessonId: string) => {
    const updated = markLessonComplete(lessonId, user?.uid);
    setProgress(updated);
  };

  const isLessonDone = (lessonId: string) => progress.completedLessons.includes(lessonId);

  // Subject icon
  const renderSubjectIcon = () => {
    switch (subject.id) {
      case 'pf-theory':
        return <Code2 className="w-8 h-8 text-blue-400" />;
      case 'pf-lab':
        return <Terminal className="w-8 h-8 text-cyan-300" />;
      case 'ict-theory':
        return <Cpu className="w-8 h-8 text-purple-400" />;
      case 'ict-lab':
        return <Wrench className="w-8 h-8 text-indigo-400" />;
      case 'functional-english':
        return <BookOpen className="w-8 h-8 text-emerald-400" />;
      case 'natural-science-theory':
        return <Atom className="w-8 h-8 text-teal-400" />;
      case 'natural-science-lab':
        return <FlaskConical className="w-8 h-8 text-teal-300" />;
      case 'calculus-analytical-geometry':
        return <LineChart className="w-8 h-8 text-amber-400" />;
      default:
        return <Code2 className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewNotes(subject.id)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 px-3 py-2 rounded-xl border border-cyan-800/40 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Subject Notes</span>
          </button>

          <button
            onClick={() => onTakeQuiz(subject.id)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-yellow-200 bg-yellow-950/40 px-3 py-2 rounded-xl border border-yellow-800/40 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Take 15-MCQ Quiz</span>
          </button>
        </div>
      </div>

      {/* Course Banner Header */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${subject.gradient} opacity-15 rounded-full blur-3xl pointer-events-none`}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg">
              {renderSubjectIcon()}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  {subject.category === 'lab' ? 'Practical Lab' : 'Theory Course'}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  {subject.code} • {subject.creditHours}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{subject.name}</h1>
              <p className="text-sm text-slate-300 max-w-2xl">{subject.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'content'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Chapters & Lessons ({subject.chapters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('definitions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'definitions'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Key Definitions ({subject.importantDefinitions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('revision')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'revision'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Revision Highlights & Exam Tips</span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS & LESSONS */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Chapters & Lessons List */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Course Outline
            </h3>

            <div className="space-y-4">
              {subject.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
                >
                  <div className="p-4 bg-slate-950/60 border-b border-slate-800">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
                      Chapter {chapter.chapterNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{chapter.title}</h4>
                  </div>

                  <div className="p-2 space-y-1">
                    {chapter.lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id;
                      const done = isLessonDone(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-bold'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Quiz Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-950/40 to-slate-900 border border-yellow-800/30 space-y-3">
              <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold">
                <HelpCircle className="w-4 h-4" />
                <span>Test Your Understanding</span>
              </div>
              <p className="text-xs text-slate-300">
                Ready for the subject examination? Complete all 15 MCQs to gauge your mastery.
              </p>
              <button
                onClick={() => onTakeQuiz(subject.id)}
                className="w-full py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Launch Subject Quiz (15 MCQs)
              </button>
            </div>
          </div>

          {/* Right Column: Selected Lesson Detail */}
          <div className="lg:col-span-8 space-y-6">
            {selectedLesson ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedLesson.estimatedMinutes} Minutes Study Time</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedLesson.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleCompleteLesson(selectedLesson.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto ${
                      isLessonDone(selectedLesson.id)
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isLessonDone(selectedLesson.id) ? 'Completed ✓' : 'Mark as Complete'}
                    </span>
                  </button>
                </div>

                {/* Lesson Body Content */}
                <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line space-y-4">
                  {selectedLesson.content}
                </div>

                {/* Code Snippet Box (if present) */}
                {selectedLesson.codeSnippet && (
                  <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-slate-400">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                        {selectedLesson.codeSnippet.language} Code Demonstration
                      </span>
                      <span>Verified Snippet</span>
                    </div>
                    <pre className="p-4 sm:p-6 text-slate-300 overflow-x-auto leading-relaxed">
                      <code>{selectedLesson.codeSnippet.code}</code>
                    </pre>
                    {selectedLesson.codeSnippet.explanation && (
                      <div className="p-3 bg-slate-900/50 border-t border-slate-800/80 text-[11px] text-slate-400 font-sans">
                        <strong>Explanation:</strong> {selectedLesson.codeSnippet.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Key Takeaways */}
                {selectedLesson.keyTakeaways && selectedLesson.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/30 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Key Takeaways</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedLesson.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Practice Task */}
                {selectedLesson.practiceTask && (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>Hands-on Student Exercise</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedLesson.practiceTask}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400">
                Select a lesson from the left to begin reading.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: IMPORTANT DEFINITIONS */}
      {activeTab === 'definitions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subject.importantDefinitions.map((def, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-blue-500/40 transition-colors"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Term #{idx + 1}
              </span>
              <h3 className="text-lg font-bold text-white">{def.term}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{def.definition}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: REVISION HIGHLIGHTS */}
      {activeTab === 'revision' && (
        <div className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Exam Preparation & Revision Highlights</span>
            </h3>
            <p className="text-xs text-slate-400">
              Key concepts, formula shortcuts, and common examination pitfalls for {subject.name}:
            </p>
            <div className="space-y-3 pt-2">
              {subject.revisionHighlights.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-mono font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
