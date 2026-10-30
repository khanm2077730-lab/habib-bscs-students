import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { ALL_NOTES } from '../data/notesData';
import { CPP_TOPICS } from '../data/cppPlaygroundData';

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubject: (subjectId: string) => void;
  onSelectNote: (noteId: string) => void;
  onOpenPlaygroundTopic: (topicId: string) => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({
  isOpen,
  onClose,
  onSelectSubject,
  onSelectNote,
  onOpenPlaygroundTopic
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { subjects: [], notes: [], cppTopics: [] };

    const subjects = ALL_SUBJECTS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.chapters.some((c) => c.title.toLowerCase().includes(q))
    ).slice(0, 4);

    const notes = ALL_NOTES.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.chapter.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q)
    ).slice(0, 4);

    const cppTopics = CPP_TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.explanation.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
    ).slice(0, 3);

    return { subjects, notes, cppTopics };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.subjects.length + searchResults.notes.length + searchResults.cppTopics.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/90 gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, chapters, notes, C++ topics, or lab exercises..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white text-xs font-mono border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-blue-400 mx-auto opacity-60" />
              <p className="text-sm font-medium text-slate-300">
                Type anything to search across the entire BSCS platform
              </p>
              <p className="text-xs text-slate-400">
                Try searching: &quot;C++&quot;, &quot;Calculus&quot;, &quot;Loops&quot;, &quot;Ohm&quot;, or &quot;Lab Manual&quot;
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-semibold text-slate-300">No matching resources found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try a different keyword or browse through the Courses catalog.
              </p>
            </div>
          ) : (
            <>
              {/* Subjects Found */}
              {searchResults.subjects.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 px-2 block">
                    Courses & Subjects ({searchResults.subjects.length})
                  </span>
                  {searchResults.subjects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectSubject(s.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {s.name}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            {s.code} • {s.category === 'lab' ? 'Lab Course' : 'Theory'}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {/* Notes Found */}
              {searchResults.notes.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 px-2 block">
                    Study Notes & Manuals ({searchResults.notes.length})
                  </span>
                  {searchResults.notes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        onSelectNote(n.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {n.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            {n.chapter} • {n.pages} pages
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {/* C++ Topics Found */}
              {searchResults.cppTopics.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 px-2 block">
                    C++ Playground Topics ({searchResults.cppTopics.length})
                  </span>
                  {searchResults.cppTopics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onOpenPlaygroundTopic(t.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {t.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            {t.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
