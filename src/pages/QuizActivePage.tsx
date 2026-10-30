import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_QUIZZES } from '../data/quizzesData';
import { ALL_SUBJECTS } from '../data/subjectsData';
import { saveQuizResult, getStudentProgress } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { QuizAttempt } from '../types';

interface QuizActivePageProps {
  subjectId: string;
  onBackToCourse: (subjectId: string) => void;
  onBackToQuizzes: () => void;
}

export const QuizActivePage: React.FC<QuizActivePageProps> = ({
  subjectId,
  onBackToCourse,
  onBackToQuizzes
}) => {
  const { user } = useAuth();
  const quiz = ALL_QUIZZES[subjectId] || ALL_QUIZZES['pf-theory'];
  const subject = ALL_SUBJECTS.find((s) => s.id === quiz.subjectId);

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(quiz.timeLimitMinutes * 60);

  // Timer countdown while quiz is not submitted
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Check if user already took this quiz previously
  useEffect(() => {
    const progress = getStudentProgress(user?.uid);
    const existing = progress.quizAttempts[quiz.subjectId];
    if (existing) {
      // Pre-loaded past result for student reference
    }
  }, [quiz.subjectId, user]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length; // 15
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return; // Locked after submit
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 50;

    const result: QuizAttempt = {
      subjectId: quiz.subjectId,
      subjectName: quiz.subjectName,
      date: new Date().toLocaleDateString(),
      score,
      totalQuestions,
      percentage,
      userAnswers: selectedAnswers,
      passed
    };

    saveQuizResult(result, user?.uid);
    setAttemptResult(result);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger celebration confetti if passed with high score
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setAttemptResult(null);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(quiz.timeLimitMinutes * 60);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToQuizzes}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="All Quizzes"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-yellow-400">
              BSCS Examination Assessment
            </span>
            <h1 className="text-base sm:text-lg font-black text-white">{quiz.subjectName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {!isSubmitted && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
                secondsRemaining < 180
                  ? 'bg-red-950/80 text-red-400 border-red-800 animate-pulse'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
          )}

          {subject && (
            <button
              onClick={() => onBackToCourse(subject.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              Back to Course
            </button>
          )}
        </div>
      </div>

      {/* QUIZ RESULTS VIEW (DISPLAYED AFTER SUBMISSION) */}
      {isSubmitted && attemptResult && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-200">
          <div className="text-center space-y-3">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto shadow-xl ${
                attemptResult.percentage >= 70
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : attemptResult.percentage >= 50
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              {attemptResult.percentage >= 70 ? (
                <Award className="w-9 h-9" />
              ) : attemptResult.percentage >= 50 ? (
                <Sparkles className="w-9 h-9" />
              ) : (
                <AlertCircle className="w-9 h-9" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">Quiz Completed!</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {attemptResult.percentage >= 70
                ? 'Excellent work! You demonstrated strong mastery of the curriculum.'
                : attemptResult.percentage >= 50
                ? 'Good effort! Review the detailed answer explanations below to strengthen your score.'
                : 'Keep practicing! Review the lesson materials and retry this quiz anytime.'}
            </p>
          </div>

          {/* Detailed Score Cards Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Total Score</span>
              <span className="text-2xl font-black text-white">
                {attemptResult.score} / {attemptResult.totalQuestions}
              </span>
              <span className="text-[10px] text-slate-500 block">1 Mark per question</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Percentage</span>
              <span
                className={`text-2xl font-black ${
                  attemptResult.percentage >= 70
                    ? 'text-emerald-400'
                    : attemptResult.percentage >= 50
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
                {attemptResult.percentage}%
              </span>
              <span className="text-[10px] text-slate-500 block">Passing score: 50%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Correct Answers</span>
              <span className="text-2xl font-black text-emerald-400">{attemptResult.score}</span>
              <span className="text-[10px] text-emerald-500/80 block">Well done</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Incorrect</span>
              <span className="text-2xl font-black text-red-400">
                {attemptResult.totalQuestions - attemptResult.score}
              </span>
              <span className="text-[10px] text-red-500/80 block">To review</span>
            </div>
          </div>

          {/* Action Buttons: Retry Quiz & Back to Course */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-slate-800">
            <button
              onClick={handleRetryQuiz}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            {subject && (
              <button
                onClick={() => onBackToCourse(subject.id)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Back to Course Lessons</span>
              </button>
            )}

            <button
              onClick={onBackToQuizzes}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-800 flex items-center gap-2 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>Take Another Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION NAVIGATOR (PILL NUMBERS 1-15) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Question Navigator ({answeredCount} of {totalQuestions} Answered)</span>
          <span>{isSubmitted ? 'Review Mode' : 'In Progress'}</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5 pt-1">
          {quiz.questions.map((q, idx) => {
            const isCurrent = currentQuestionIndex === idx;
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswer;
            const isWrong = isSubmitted && isAnswered && selectedAnswers[q.id] !== q.correctAnswer;

            let btnClass = 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700';

            if (isSubmitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-950/80 text-emerald-400 border-emerald-600 font-bold';
              } else if (isWrong) {
                btnClass = 'bg-red-950/80 text-red-400 border-red-600 font-bold';
              } else {
                btnClass = 'bg-slate-950 text-slate-500 border-slate-800';
              }
            } else if (isCurrent) {
              btnClass = 'bg-blue-600 text-white border-blue-400 font-bold shadow-md shadow-blue-600/30';
            } else if (isAnswered) {
              btnClass = 'bg-slate-800 text-blue-300 border-blue-500/40 font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${btnClass}`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE QUESTION CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold uppercase tracking-wider text-blue-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            {currentQuestion.topic && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-mono text-[11px]">{currentQuestion.topic}</span>
              </>
            )}
          </div>
          <span className="text-slate-400 font-mono">1 Mark</span>
        </div>

        {/* Question Title */}
        <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options (A, B, C, D) */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, optIdx) => {
            const letter = ['A', 'B', 'C', 'D'][optIdx];
            const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
            const isCorrectAnswer = currentQuestion.correctAnswer === optIdx;

            let cardStyle =
              'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-400';

            if (isSubmitted) {
              if (isCorrectAnswer) {
                cardStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
                badgeStyle = 'bg-emerald-600 text-white font-bold';
              } else if (isSelected && !isCorrectAnswer) {
                cardStyle = 'bg-red-950/40 border-red-500/80 text-red-200';
                badgeStyle = 'bg-red-600 text-white font-bold';
              }
            } else if (isSelected) {
              cardStyle = 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-sm';
              badgeStyle = 'bg-blue-600 text-white font-bold';
            }

            return (
              <button
                key={optIdx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${cardStyle} ${
                  !isSubmitted ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${badgeStyle}`}
                >
                  {letter}
                </span>
                <span className="text-xs sm:text-sm pt-0.5 leading-relaxed">{option}</span>

                {isSubmitted && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0 mt-0.5" />
                )}
                {isSubmitted && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* AFTER SUBMISSION: EXPLANATION BOX */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-2 mt-4 animate-in fade-in duration-150">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Correct Answer & Detailed Explanation</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              <strong>Answer: {['Option A', 'Option B', 'Option C', 'Option D'][currentQuestion.correctAnswer]}</strong> — {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : !isSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Quiz (15 Marks)</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(0)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Back to Question 1</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
