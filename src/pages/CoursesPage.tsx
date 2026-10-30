import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Layers,
  Search,
  Filter,
  GraduationCap
} from 'lucide-react';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { SubjectCard } from '../components/SubjectCard';

interface CoursesPageProps {
  onSelectSubject: (subjectId: string) => void;
  onTakeQuiz: (subjectId: string) => void;
  onViewNotes: (subjectId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onSelectSubject,
  onTakeQuiz,
  onViewNotes
}) => {
  const [filter, setFilter] = useState<'all' | 'theory' | 'lab'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = ALL_SUBJECTS.filter((subject) => {
    const matchesFilter = filter === 'all' || subject.category === filter;
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const theoryCount = ALL_SUBJECTS.filter((s) => s.category === 'theory').length;
  const labCount = ALL_SUBJECTS.filter((s) => s.category === 'lab').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>BSCS Semester 1 Academic Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          BSCS Courses & Practical Labs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive curriculum tailored for computer science students. Theory subjects build conceptual understanding, while practical labs provide hands-on programming and experimental mastery.
        </p>

        {/* Filters and Search Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Courses ({ALL_SUBJECTS.length})</span>
            </button>

            <button
              onClick={() => setFilter('theory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                filter === 'theory'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Theory ({theoryCount})</span>
            </button>

            <button
              onClick={() => setFilter('lab')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                filter === 'lab'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
              <span>Practical Labs ({labCount})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title or code..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      {filteredSubjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
          <Filter className="w-8 h-8 mx-auto text-slate-500 mb-2" />
          <p className="text-base font-semibold text-slate-300">No courses match your filter</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting your search query or switching categories.</p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={onSelectSubject}
              onTakeQuiz={onTakeQuiz}
              onViewNotes={onViewNotes}
            />
          ))}
        </div>
      )}

      {/* Curriculum Note & Syllabus Context */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
        <strong className="text-slate-200 block text-sm">Course Structure & Academic Standards:</strong>
        <p>
          Theory subjects and practical labs are maintained as completely separate learning paths. Programming Fundamentals Theory covers logic, memory layout, variables, and algorithms; Programming Fundamentals Lab covers command-line compiling, terminal debugging, and code worksheets.
        </p>
        <p className="text-[11px] text-slate-400">
          *Note: Presented as structured introductory BSCS university learning material aligned with standard computer science foundations.
        </p>
      </div>
    </div>
  );
};
