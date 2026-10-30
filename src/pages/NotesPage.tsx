import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  Filter,
  Search,
  Bookmark,
  Printer,
  Sparkles,
  Layers,
  FlaskConical,
  Award
} from 'lucide-react';
import { ALL_NOTES } from '../data/notesData';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { NoteItem } from '../types';
import { toggleBookmarkNote, getStudentProgress } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

interface NotesPageProps {
  onOpenNote: (note: NoteItem) => void;
  filterSubjectId?: string;
}

export const NotesPage: React.FC<NotesPageProps> = ({ onOpenNote, filterSubjectId }) => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>(filterSubjectId || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState(() => getStudentProgress(user?.uid));

  useEffect(() => {
    setProgress(getStudentProgress(user?.uid));
  }, [user]);

  const handleBookmark = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    const updated = toggleBookmarkNote(noteId, user?.uid);
    setProgress(updated);
  };

  const handleDirectDownload = (e: React.MouseEvent, note: NoteItem) => {
    e.stopPropagation();
    const filename = `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    const blob = new Blob([note.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredNotes = ALL_NOTES.filter((note) => {
    const matchesSubject = selectedSubject === 'all' || note.subjectId === selectedSubject;
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesCategory && matchesSearch;
  });

  const lectureNotesCount = ALL_NOTES.filter((n) => n.category === 'lecture-notes').length;
  const labManualsCount = ALL_NOTES.filter((n) => n.category === 'lab-manual').length;
  const revisionSheetsCount = ALL_NOTES.filter((n) => n.category === 'revision-sheet').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>BSCS Notes & Study Materials Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Notes, Lab Manuals & Cheat Sheets
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Organized chapter-by-chapter notes, practical laboratory worksheets, and revision quick sheets. Read online, copy markdown, print to PDF, or download with 1-click.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono shrink-0">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px]">Total Files</span>
              <span className="text-lg font-bold text-white">{ALL_NOTES.length} Guides</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px]">Saved</span>
              <span className="text-lg font-bold text-cyan-400">
                {progress.bookmarkedNotes.length} Bookmarks
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
          {/* Category Tabs: All, Lecture Notes, Lab Manuals, Revision Sheets */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Documents ({ALL_NOTES.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('lecture-notes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'lecture-notes'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Lecture Notes ({lectureNotesCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('lab-manual')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'lab-manual'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-cyan-300" />
              <span>Lab Manuals ({labManualsCount})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('revision-sheet')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'revision-sheet'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Revision Sheets ({revisionSheetsCount})</span>
            </button>
          </div>

          {/* Subject Dropdown & Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Filter Subject:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All 8 Subjects</option>
                {ALL_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, chapters..."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 text-xs text-white rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-2">
          <Filter className="w-8 h-8 mx-auto text-slate-500" />
          <p className="text-base font-semibold text-slate-200">No documents found matching criteria</p>
          <p className="text-xs text-slate-400">Try choosing &quot;All 8 Subjects&quot; or clearing your search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const isBookmarked = progress.bookmarkedNotes.includes(note.id);
            const subject = ALL_SUBJECTS.find((s) => s.id === note.subjectId);

            return (
              <div
                key={note.id}
                onClick={() => onOpenNote(note)}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 shadow-lg flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-0.5 space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
                      {note.category.replace('-', ' ')}
                    </span>

                    <button
                      onClick={(e) => handleBookmark(e, note.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-yellow-950 text-yellow-400 border-yellow-700'
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this note'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {subject?.name || 'BSCS'} • {note.chapter}
                  </p>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{note.pages} Pages</span>
                    <span>{note.fileSize}</span>
                    <span className="text-emerald-400 font-bold">Ready</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenNote(note)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Online</span>
                    </button>

                    <button
                      onClick={(e) => handleDirectDownload(e, note)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                      title="Download file directly"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
