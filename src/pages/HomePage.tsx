import React from 'react';
import {
  Laptop,
  Code2,
  Terminal,
  BookOpen,
  HelpCircle,
  FileText,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle,
  GraduationCap,
  Layers,
  Cpu,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { SITE_CONFIG } from '../data/constants';
import { SubjectCard } from '../components/SubjectCard';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectSubject: (subjectId: string) => void;
  onTakeQuiz: (subjectId: string) => void;
  onViewNotes: (subjectId: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectSubject,
  onTakeQuiz,
  onViewNotes,
  onOpenAuth
}) => {
  const { user } = useAuth();
  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-2xl">
        {/* Subtle decorative background tech patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Welcome Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Welcome to Habib BSCS Students Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-normal">Semester 1 Core Hub</span>
          </div>

          {/* Main Large Headings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">Habib BSCS Students</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-slate-300">
              Your Complete BSCS Learning Platform
            </p>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Master your university computer science courses, practise C++ programming step-by-step, challenge yourself with 120 MCQs quizzes, and access comprehensive revision notes and lab manuals.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-slate-700 shadow-md transition-all flex items-center gap-2 focus:outline-none"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Explore Courses</span>
            </button>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>

          {/* Tech Visual Element: Laptop Mockup & Terminal Code Window */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-2xl overflow-hidden text-left font-mono text-xs sm:text-sm">
              {/* Window Controls */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-blue-400" />
                    habib_bscs_terminal ~ g++ main.cpp -o app && ./app
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-emerald-400 font-bold">● Active Session</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-4 sm:p-6 space-y-2 text-slate-300 overflow-x-auto leading-relaxed">
                <div>
                  <span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;iostream&gt;</span>
                </div>
                <div>
                  <span className="text-purple-400">using namespace</span> <span className="text-yellow-300">std</span>;
                </div>
                <div className="pt-2">
                  <span className="text-blue-400">int</span> <span className="text-cyan-300">main</span>() &#123;
                </div>
                <div className="pl-6">
                  <span className="text-slate-400">// Habib BSCS Students: Master Computer Science</span>
                </div>
                <div className="pl-6">
                  <span className="text-cyan-300">cout</span> &lt;&lt; <span className="text-emerald-300">&quot;Ready to excel in BSCS Semester 1? Let&apos;s code!&quot;</span> &lt;&lt; <span className="text-cyan-300">endl</span>;
                </div>
                <div className="pl-6">
                  <span className="text-purple-400">return</span> <span className="text-amber-400">0</span>;
                </div>
                <div>&#125;</div>

                <div className="pt-3 border-t border-slate-800 text-emerald-400 flex items-center gap-2 font-semibold">
                  <span className="text-slate-400">&gt; Output:</span>
                  <span>Ready to excel in BSCS Semester 1? Let&apos;s code!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & OVERVIEW BAR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            8
          </span>
          <p className="text-sm font-bold text-white">BSCS Subjects</p>
          <p className="text-xs text-slate-400">4 Theory + 4 Practical Labs</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
            120
          </span>
          <p className="text-sm font-bold text-white">Original MCQs</p>
          <p className="text-xs text-slate-400">15 MCQs per Subject Quiz</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            100%
          </span>
          <p className="text-sm font-bold text-white">Separated Labs</p>
          <p className="text-xs text-slate-400">Dedicated Practical Modules</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            10+
          </span>
          <p className="text-sm font-bold text-white">Downloadable Notes</p>
          <p className="text-xs text-slate-400">Printable Guides & Manuals</p>
        </div>
      </section>

      {/* 3. EIGHT COMPLETE BSCS SUBJECTS SHOWCASE */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Full Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Eight Complete BSCS Subjects
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Every subject features unique icons, colors, chapter explanations, important definitions, code examples, and practice questions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800/60 transition-colors"
            >
              <span>View All 8 Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={onSelectSubject}
              onTakeQuiz={onTakeQuiz}
              onViewNotes={onViewNotes}
            />
          ))}
        </div>
      </section>

      {/* 4. C++ PROGRAMMING PLAYGROUND SPOTLIGHT */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Beginner-Friendly C++ Area</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Programming Fundamentals C++ Playground
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Step through 12 organized C++ lessons: understand variables, conditional logic, for/while loops, modular functions, arrays, and avoid common programming mistakes.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Copyable working C++ code snippets with expected outputs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Line-by-line step explanations and practice tasks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Common beginner errors identified and corrected</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('cpp-playground')}
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md shadow-cyan-600/30 flex items-center gap-2 transition-all active:scale-95"
              >
                <Code2 className="w-4 h-4" />
                <span>Open C++ Playground</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 shadow-inner font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
              <span>Sample: Simple Calculator in C++</span>
              <span className="text-emerald-400 font-bold">✓ Tested Code</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto leading-relaxed">
              <code>{`#include <iostream>
using namespace std;

int main() {
    double a = 45, b = 15;
    char op = '*';
    if (op == '*') cout << (a * b) << endl; // 675
    return 0;
}`}</code>
            </pre>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 flex items-center justify-between">
              <span>Expected Output: 675</span>
              <span className="text-slate-400">12 Total Topics Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 120 MCQs QUIZZES SYSTEM SHOWCASE */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Assessment & Testing System</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              15 MCQs Per Subject (120 Questions Total)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Every subject has its own dedicated 15-question quiz with instant automatic scoring, 1 mark per correct answer, percentage calculation, and explanations after submission.
            </p>
          </div>

          <button
            onClick={() => onNavigate('quizzes')}
            className="px-5 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm shadow-md shadow-yellow-500/20 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Launch Quiz Center</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block">Questions per Quiz</span>
            <span className="text-lg font-bold text-white">15 MCQs</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block">Max Score</span>
            <span className="text-lg font-bold text-white">15 Marks</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block">Scoring System</span>
            <span className="text-lg font-bold text-emerald-400">Auto + Percent %</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-400 block">Answer Review</span>
            <span className="text-lg font-bold text-cyan-400">With Explanations</span>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP CONTACT SECTION (SECTION 11 A REQUIREMENT) */}
      <section className="relative rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-8 sm:p-12 shadow-2xl overflow-hidden">
        {/* Glow & pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#25D366]/20 border border-emerald-500/40 text-[#25D366] shadow-lg shadow-emerald-500/20 mx-auto">
            <MessageCircle className="w-9 h-9 fill-current" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Need Help with Your BSCS Studies?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Have a question about programming, courses, notes, or quizzes? Contact Habib directly on WhatsApp.
            </p>
          </div>

          {/* Number Display */}
          <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 shadow-inner">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">
              Direct Student Support Line
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wider">
              WhatsApp: {SITE_CONFIG.whatsappDisplay}
            </span>
          </div>

          {/* Clickable Green Button */}
          <div>
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Chat with Habib on WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Open WhatsApp Web or mobile app instantly. Direct chat with zero forms or verification delays.
          </p>
        </div>
      </section>

      {/* 7. NOTES & STUDY MATERIALS BANNER */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>Academic Library</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Downloadable Notes & Lab Manuals
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Access chapter-by-chapter revision summaries, official laboratory worksheets, and formula cheat sheets. View them in our reader or download directly.
          </p>
        </div>

        <button
          onClick={() => onNavigate('notes')}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 shrink-0 transition-all"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Browse Notes Library</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
