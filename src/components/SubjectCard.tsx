import React from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Wrench,
  BookOpen,
  Atom,
  FlaskConical,
  LineChart,
  ArrowRight,
  HelpCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onSelect: (subjectId: string) => void;
  onTakeQuiz: (subjectId: string) => void;
  onViewNotes: (subjectId: string) => void;
  isCompleted?: boolean;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onSelect,
  onTakeQuiz,
  onViewNotes,
  isCompleted = false
}) => {
  // Render specific icon based on subject
  const renderSubjectIcon = () => {
    switch (subject.id) {
      case 'pf-theory':
        return <Code className="w-6 h-6 text-blue-400" />;
      case 'pf-lab':
        return <Terminal className="w-6 h-6 text-cyan-300" />;
      case 'ict-theory':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'ict-lab':
        return <Wrench className="w-6 h-6 text-indigo-400" />;
      case 'functional-english':
        return <BookOpen className="w-6 h-6 text-emerald-400" />;
      case 'natural-science-theory':
        return <Atom className="w-6 h-6 text-teal-400" />;
      case 'natural-science-lab':
        return <FlaskConical className="w-6 h-6 text-teal-300" />;
      case 'calculus-analytical-geometry':
        return <LineChart className="w-6 h-6 text-amber-400" />;
      default:
        return <Code className="w-6 h-6 text-blue-400" />;
    }
  };

  // Border and badge color tokens
  const getBadgeStyles = () => {
    if (subject.category === 'lab') {
      return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80';
    }
    return 'bg-blue-950/80 text-blue-300 border-blue-800/80';
  };

  return (
    <div
      className={`group relative rounded-2xl bg-slate-900/90 border ${subject.borderColor} p-6 flex flex-col justify-between shadow-xl shadow-slate-950/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      {/* Decorative gradient glow corner */}
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${subject.gradient} opacity-20 group-hover:opacity-35 blur-xl transition-opacity pointer-events-none`}
      />

      <div>
        {/* Top Header: Icon + Category Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-md group-hover:scale-110 transition-transform">
            {renderSubjectIcon()}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${getBadgeStyles()}`}
            >
              {subject.category === 'lab' ? 'Practical Lab' : 'Theory Course'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {subject.code} • {subject.creditHours.split(' ')[0]} Cr
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 mb-1.5">
          {subject.name}
        </h3>
        <p className="text-xs text-slate-300 font-medium line-clamp-2 mb-3">
          {subject.tagline}
        </p>

        {/* Key Features Pill Bar */}
        <div className="flex items-center gap-3 text-xs text-slate-400 pb-4 mb-4 border-b border-slate-800/80">
          <span className="flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {subject.chapters.length} Chapters
          </span>
          <span className="flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            15 MCQs Quiz
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold ml-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Started
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => onSelect(subject.id)}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onTakeQuiz(subject.id)}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700/60 flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
          >
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
            <span>Quiz (15 MCQs)</span>
          </button>

          <button
            onClick={() => onViewNotes(subject.id)}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700/60 flex items-center justify-center gap-1.5 transition-colors focus:outline-none"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Notes & PDFs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
