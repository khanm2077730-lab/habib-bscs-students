import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { NoteItem } from '../types';

interface NoteViewerModalProps {
  note: NoteItem | null;
  onClose: () => void;
}

export const NoteViewerModal: React.FC<NoteViewerModalProps> = ({ note, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!note) return null;

  // Real download handler
  const handleDownloadFile = () => {
    const filename = `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_notes.md`;
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

  // Real print to PDF handler
  const handlePrint = () => {
    window.print();
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {note.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono">{note.fileFormat} Document</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {note.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close Note Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              {note.pages} Pages
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              {note.fileSize}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {note.uploadedDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium flex items-center gap-1.5 border border-slate-700 transition-all focus:outline-none"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium flex items-center gap-1.5 border border-slate-700 transition-all focus:outline-none"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all focus:outline-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-slate-200 text-sm leading-relaxed printable-content">
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-200 text-xs">
            <strong>About this document:</strong> {note.description}
          </div>

          <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 font-mono whitespace-pre-wrap leading-relaxed text-xs sm:text-sm text-slate-300">
            {note.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Habib BSCS Students • Academic Learning Library</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
