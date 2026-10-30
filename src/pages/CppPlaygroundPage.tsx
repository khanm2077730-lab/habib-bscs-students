import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Play,
  Sparkles,
  AlertTriangle,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { CPP_TOPICS } from '../data/cppPlaygroundData';
import { CppTopic } from '../types';

interface CppPlaygroundPageProps {
  initialTopicId?: string;
}

export const CppPlaygroundPage: React.FC<CppPlaygroundPageProps> = ({ initialTopicId }) => {
  const [selectedTopic, setSelectedTopic] = useState<CppTopic>(() => {
    if (initialTopicId) {
      const match = CPP_TOPICS.find((t) => t.id === initialTopicId);
      if (match) return match;
    }
    return CPP_TOPICS[0];
  });

  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'steps' | 'errors'>('code');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedTopic.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSimulateRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive C++ Learning Environment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              C++ Programming Fundamentals Playground
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Beginner-friendly step-by-step lessons in modern C++. Explore syntax, understand memory logic, examine verified outputs, and master computer programming.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Standard: C++17 / GCC Toolchain</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Topics Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Curriculum Topics ({CPP_TOPICS.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">100% Beginner Friendly</span>
          </div>

          <div className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1">
            {CPP_TOPICS.map((topic, index) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setActiveTab('code');
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-all group ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-white border border-cyan-500/40 font-bold shadow-md'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate">{topic.title.split('. ')[1] || topic.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Display */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            {/* Header of Active Topic */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60">
                  {selectedTopic.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedTopic.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleSimulateRun}
                  disabled={isSimulating}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Running...' : 'Run Simulation'}</span>
                </button>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Explanation: </strong>
              {selectedTopic.explanation}
            </div>

            {/* Tabs Bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'code'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code & Expected Output</span>
              </button>

              <button
                onClick={() => setActiveTab('steps')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'steps'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step-by-Step Breakdown</span>
              </button>

              <button
                onClick={() => setActiveTab('errors')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'errors'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                <span>Common Errors & Fixes</span>
              </button>
            </div>

            {/* TAB CONTENT: CODE & TERMINAL OUTPUT */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                {/* Code Window */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300 font-sans text-xs">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      main.cpp (C++17)
                    </span>
                    <span className="text-[10px] text-slate-500">Read-only verified source</span>
                  </div>
                  <pre className="p-4 sm:p-6 text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{selectedTopic.code}</code>
                  </pre>
                </div>

                {/* Expected Output Console Window */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px] font-sans">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      Standard Console Output (cout)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Exit Code 0</span>
                  </div>
                  <div className="p-4 sm:p-5 text-emerald-400 whitespace-pre-wrap leading-relaxed bg-black/40">
                    {selectedTopic.expectedOutput}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: STEP BY STEP */}
            {activeTab === 'steps' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {selectedTopic.stepByStep.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Practice Task Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-950 border border-blue-800/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Student Practice Challenge</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                    {selectedTopic.practiceTask}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: COMMON ERRORS */}
            {activeTab === 'errors' && (
              <div className="p-6 rounded-2xl bg-yellow-950/20 border border-yellow-800/40 space-y-3">
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Watch Out for This Beginner Mistake:</span>
                </div>
                <p className="text-xs sm:text-sm text-yellow-200/90 leading-relaxed font-mono">
                  {selectedTopic.commonMistakes}
                </p>
                <p className="text-xs text-slate-400 pt-2 border-t border-yellow-900/40">
                  Tip: Always read your compiler error line numbers carefully in GCC or Visual Studio Code. The error is usually located on or just before the reported line.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
