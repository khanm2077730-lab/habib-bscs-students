import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Wrench,
  BookOpen,
  Atom,
  FlaskConical,
  LineChart,
  RotateCcw
} from 'lucide-react';
import { ALL_QUIZZES } from '../data/quizzesData';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { getStudentProgress } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

interface QuizzesPageProps {
  onStartQuiz: (subjectId: string) => void;
  onSelectSubject: (subjectId: string) => void;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({ onStartQuiz, onSelectSubject }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => getStudentProgress(user?.uid));

  useEffect(() => {
    setProgress(getStudentProgress(user?.uid));
  }, [user]);

  const quizzesList = Object.values(ALL_QUIZZES);
  const attempts = progress.quizAttempts;
  const attemptsCount = Object.keys(attempts).length;

  const renderSubjectIcon = (subjectId: string) => {
    switch (subjectId) {
      case 'pf-theory':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'pf-lab':
        return <Terminal className="w-5 h-5 text-cyan-300" />;
      case 'ict-theory':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'ict-lab':
        return <Wrench className="w-5 h-5 text-indigo-400" />;
      case 'functional-english':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'natural-science-theory':
        return <Atom className="w-5 h-5 text-teal-400" />;
      case 'natural-science-lab':
        return <FlaskConical className="w-5 h-5 text-teal-300" />;
      case 'calculus-analytical-geometry':
        return <LineChart className="w-5 h-5 text-amber-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/80 border border-yellow-500/30 text-yellow-300 text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>Standardized University Assessment System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              BSCS Examination Quizzes
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              8 complete subjects × 15 MCQs each = 120 original questions. Test your knowledge with automated scoring (max 15 marks), instant feedback, and detailed answer explanations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono shrink-0">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Total MCQs</span>
              <span className="text-xl font-bold text-yellow-400">120 Questions</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Your Attempts</span>
              <span className="text-xl font-bold text-cyan-400">{attemptsCount} / 8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 8 Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzesList.map((quiz) => {
          const attempt = attempts[quiz.subjectId];
          const subject = ALL_SUBJECTS.find((s) => s.id === quiz.subjectId);

          return (
            <div
              key={quiz.subjectId}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      {renderSubjectIcon(quiz.subjectId)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {subject?.code || 'CS'} • {subject?.category === 'lab' ? 'Practical Lab' : 'Theory'}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-1">{quiz.subjectName}</h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                    15 MCQs
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono py-2 border-y border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {quiz.timeLimitMinutes} Mins
                  </span>
                  <span>•</span>
                  <span>1 Mark / Correct Answer</span>
                  <span>•</span>
                  <span>Max: 15 Marks</span>
                </div>

                {/* Previous Attempt Status if available */}
                {attempt ? (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Latest Attempt:</span>
                      <span className="font-bold text-white">
                        Score: {attempt.score}/15 ({attempt.percentage}%)
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        attempt.passed
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {attempt.passed ? 'PASSED ✓' : 'NEEDS PRACTICE'}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-xs text-slate-500 font-mono">
                    Not attempted yet. Ready to start?
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onStartQuiz(quiz.subjectId)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  {attempt ? <RotateCcw className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                  <span>{attempt ? 'Retake Quiz' : 'Start 15-MCQ Quiz'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>

                {subject && (
                  <button
                    onClick={() => onSelectSubject(subject.id)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Course
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
