export type SubjectId =
  | 'pf-theory'
  | 'pf-lab'
  | 'ict-theory'
  | 'ict-lab'
  | 'functional-english'
  | 'natural-science-theory'
  | 'natural-science-lab'
  | 'calculus-analytical-geometry';

export type SubjectCategory = 'theory' | 'lab';

export interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  content: string; // Markdown or rich formatted text
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
  };
  definitions?: { term: string; explanation: string }[];
  keyTakeaways: string[];
  practiceTask?: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  summary: string;
  realWorldApplication: string;
  lessons: Lesson[];
  practiceQuestions: string[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  category: SubjectCategory;
  creditHours: string;
  iconName: string;
  color: string; // Tailwind color theme identifier
  gradient: string;
  borderColor: string;
  tagline: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string;
  chapters: Chapter[];
  importantDefinitions: { term: string; definition: string }[];
  revisionHighlights: string[];
}

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string]; // exactly A, B, C, D
  correctAnswer: 0 | 1 | 2 | 3; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  topic?: string;
}

export interface SubjectQuiz {
  subjectId: SubjectId;
  subjectName: string;
  totalQuestions: number; // exactly 15
  timeLimitMinutes: number;
  questions: Question[];
}

export interface QuizAttempt {
  subjectId: SubjectId;
  subjectName: string;
  date: string;
  score: number; // out of 15
  totalQuestions: number; // 15
  percentage: number;
  userAnswers: Record<number, number>; // questionId -> chosen index
  passed: boolean;
}

export interface NoteItem {
  id: string;
  subjectId: SubjectId;
  title: string;
  chapter: string;
  category: 'lecture-notes' | 'lab-manual' | 'revision-sheet';
  fileFormat: 'PDF' | 'DOC' | 'MD';
  pages: number;
  fileSize: string;
  uploadedDate: string;
  description: string;
  content: string; // Full reading & printable text
}

export interface CppTopic {
  id: string;
  title: string;
  category: 'Basics' | 'Data & Operators' | 'Control Flow' | 'Data Structures' | 'Advanced';
  explanation: string;
  code: string;
  expectedOutput: string;
  stepByStep: string[];
  practiceTask: string;
  commonMistakes: string;
}

export interface StudentProgress {
  completedLessons: string[]; // lesson ids
  quizAttempts: Record<SubjectId, QuizAttempt>;
  bookmarkedNotes: string[]; // note ids
  lastVisitedSubject?: SubjectId;
}
