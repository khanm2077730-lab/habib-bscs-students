import React from 'react';
import {
  Laptop,
  Code2,
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileText,
  MessageCircle,
  Shield,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '../data/constants';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>About Our Educational Initiative</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Habib BSCS Students</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          &quot;Habib BSCS Students is an educational platform designed to help BSCS students understand computer science concepts, learn programming, practise through quizzes, and access useful study resources.&quot;
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('courses')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Explore 8 Subjects
          </button>
          <a
            href={SITE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat with Habib</span>
          </a>
        </div>
      </div>

      {/* 1. Website Purpose */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">Foundation</span>
            <h2 className="text-xl font-bold text-white">Our Educational Mission & Purpose</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Transitioning into a Bachelor of Science in Computer Science (BSCS) can be challenging. Many university students encounter conceptual stumbling blocks when dealing with memory allocation, logic gates, mathematical limits, and technical English grammar.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Habib BSCS Students</strong> bridges the gap between complex lecture slides and practical comprehension. We provide clear, plain-language explanations, structured C++ code examples, authentic MCQ assessments, and revision materials designed to empower university students throughout Semester 1 and beyond.
        </p>
      </section>

      {/* 4 Pillars Grid: Courses, Programming, Quizzes, Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Courses */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-blue-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Eight BSCS Subjects</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Full coverage of 8 distinct courses: 4 theoretical subjects and 4 practical laboratory courses. Theory and lab disciplines are kept strictly separate to ensure students grasp concepts and laboratory skills with equal depth.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 font-mono pt-1">
            <li>• Programming Fundamentals (Theory & Lab)</li>
            <li>• ICT (Theory & Lab)</li>
            <li>• Functional English</li>
            <li>• Natural Science (Theory & Lab)</li>
            <li>• Calculus & Analytical Geometry</li>
          </ul>
        </div>

        {/* Programming Practice */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <Terminal className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Programming Practice</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hands-on learning through our C++ Programming Playground. Topics range from syntax fundamentals (`#include`, `cout`, `cin`), control flow (`if-else`, loops), to modular functions and arrays with copyable code and verified terminal outputs.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 font-mono pt-1">
            <li>• 12 Structured Beginner Topics</li>
            <li>• Expected Output Displays</li>
            <li>• Common Programming Pitfalls</li>
          </ul>
        </div>

        {/* MCQ Quizzes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-yellow-400">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">120 MCQs Quiz System</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every subject includes an authentic 15-question multiple choice quiz (8 subjects × 15 MCQs = 120 questions). The system features automatic score calculation out of 15 marks, percentage metrics, and in-depth explanations for every answer.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 font-mono pt-1">
            <li>• Exactly 15 Questions per Quiz</li>
            <li>• Detailed Explanations After Submission</li>
            <li>• Local Storage Progress Tracking</li>
          </ul>
        </div>

        {/* Study Notes */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <FileText className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Notes & Study Library</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Curated repository of academic study materials, lab worksheets, and revision cheat sheets. Documents can be read in an in-browser reader, printed directly as PDF, or downloaded in markdown format.
          </p>
          <ul className="text-xs text-slate-400 space-y-1 font-mono pt-1">
            <li>• Chapter-by-Chapter Lecture Guides</li>
            <li>• Practical Laboratory Manuals</li>
            <li>• Printable Formula Quick Sheets</li>
          </ul>
        </div>
      </div>

      {/* Official WhatsApp Contact Information */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
              Student Inquiries & Academic Help
            </span>
            <h2 className="text-2xl font-black text-white">Contact Information</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              If you have any questions regarding university coursework, need guidance on programming exercises, or want to discuss BSCS topics, connect directly with Habib on WhatsApp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shrink-0">
            <div className="text-xs font-mono text-slate-400">
              WhatsApp Support Line:
              <strong className="block text-base font-bold text-white mt-0.5">
                {SITE_CONFIG.whatsappDisplay}
              </strong>
            </div>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Open WhatsApp Chat</span>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          *Academic Notice: Habib BSCS Students provides educational reference materials to aid student self-study. All content is prepared for learning and exam revision purposes.
        </div>
      </section>
    </div>
  );
};
