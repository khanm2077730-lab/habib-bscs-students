import React from 'react';
import {
  Laptop,
  Code2,
  MessageCircle,
  ExternalLink,
  BookOpen,
  FlaskConical,
  Award
} from 'lucide-react';
import { SITE_CONFIG } from '../data/constants';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectSubject: (subjectId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectSubject }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Background soft glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative">
                  <Laptop className="w-5 h-5 text-blue-400" />
                  <span className="absolute -bottom-1 -right-1 bg-cyan-500 text-[8px] font-mono font-bold text-white px-1 rounded-full">
                    <Code2 className="w-2.5 h-2.5 inline" />
                  </span>
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Habib <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">BSCS</span> Students
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Your comprehensive university BSCS academic resource portal. Featuring 8 distinct subjects, hands-on C++ programming playground, 120 authentic MCQs quizzes, and revision notes.
            </p>

            {/* Prominent WhatsApp Box in Footer */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                  Official WhatsApp Contact
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {SITE_CONFIG.whatsappNumber}
                </span>
              </div>
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all self-start sm:self-auto"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Chat with Habib</span>
              </a>
            </div>
          </div>

          {/* Theory Subjects */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Theory Courses
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectSubject('pf-theory')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Programming Fundamentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('ict-theory')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  ICT Theory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('functional-english')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Functional English
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('natural-science-theory')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Natural Science Theory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('calculus-analytical-geometry')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Calculus & Analytical Geometry
                </button>
              </li>
            </ul>
          </div>

          {/* Practical Labs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              Practical Labs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectSubject('pf-lab')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Programming Fundamentals Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('ict-lab')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  ICT Practical Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('natural-science-lab')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Natural Science Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cpp-playground')}
                  className="text-cyan-400 font-semibold hover:underline flex items-center gap-1 mt-2 text-left"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>C++ Code Playground</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Access & Tools */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              Student Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('quizzes')}
                  className="hover:text-white transition-colors text-left"
                >
                  120 MCQs Quizzes (8 Subjects)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notes')}
                  className="hover:text-white transition-colors text-left"
                >
                  Notes & PDF Manuals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Progress Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Habib BSCS Platform
                </button>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>Direct WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-slate-300">Habib BSCS Students</strong>. Built for Computer Science University Students.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              WhatsApp Help: <strong className="text-emerald-400">{SITE_CONFIG.whatsappDisplay}</strong>
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400">Semester 1 BSCS Core Curriculum</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
