import React from 'react';
import { Home, Timer, CheckSquare, ChevronLeft } from 'lucide-react';

export default function QuizHeader({
  currentQuestionIndex,
  totalQuestions,
  mode,
  timerSeconds,
  onBackToDashboard,
  onSubmitQuiz
}) {
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Formatter for MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimerLow = timerSeconds < 120; // less than 2 minutes warning

  return (
    <div className="w-full glass-panel border-b border-white/5 py-4 px-6 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Branding & Back button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors py-1.5 px-3 bg-slate-900/60 rounded-xl border border-slate-800"
          >
            <ChevronLeft size={16} />
            <span>Dashboard</span>
          </button>

          <span className="hidden md:inline text-slate-600">|</span>

          <h1 className="text-2xl font-extrabold select-none tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent font-display italic">
              Lệ Huyền
            </span>
          </h1>
        </div>

        {/* Telemetry info */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 ml-auto md:ml-0">
          {/* Progress Tracker */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Progress
            </span>
            <span className="text-sm font-bold text-slate-200">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Mode Badge & Timer */}
          {mode === 'exam' ? (
            <div className={`flex items-center gap-2 py-1.5 px-3 rounded-xl border ${
              isTimerLow 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                : 'bg-slate-900/60 border-slate-800 text-indigo-400'
            }`}>
              <Timer size={16} />
              <span className="text-sm font-mono font-bold">
                {formatTime(timerSeconds)}
              </span>
            </div>
          ) : (
            <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3 py-1.5 rounded-xl font-bold">
              Practice Mode
            </span>
          )}

          {/* Submit Quiz Trigger */}
          <button
            type="button"
            onClick={onSubmitQuiz}
            className="flex items-center gap-1.5 py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
          >
            <CheckSquare size={15} />
            <span>Submit Quiz</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-1.5 mt-4 rounded-full overflow-hidden max-w-5xl mx-auto">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
