import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { RotateCcw, Home, CheckCircle2, XCircle, ChevronDown, ChevronUp, Award, Calendar, AlertCircle } from 'lucide-react';

export default function ResultView({
  results, // { block, test, mode, score, correct, total, userAnswers, questions }
  onRetake,
  onBackToDashboard
}) {
  const { score, correct, total, questions, userAnswers } = results;
  const incorrect = total - correct;
  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'incorrect'
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Filtered list of questions
  const filteredQuestions = questions.filter((q, idx) => {
    const userAnswer = userAnswers[q.questionNumber];
    const correctOption = q.answerOptions.find(o => o.isCorrect)?.text;
    const isCorrect = userAnswer === correctOption;

    if (filter === 'correct') return isCorrect;
    if (filter === 'incorrect') return !isCorrect;
    return true;
  });

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Determine feedback message based on score
  const getScoreFeedback = (pct) => {
    if (pct >= 90) return { title: "Outstanding Work!", desc: "Excellent mastery of the marketing curriculum!", color: "from-emerald-400 to-teal-500" };
    if (pct >= 80) return { title: "Great Job!", desc: "Solid understanding of the core concepts.", color: "from-indigo-400 to-cyan-500" };
    if (pct >= 50) return { title: "Keep Practicing!", desc: "Good start, review the rationales to improve further.", color: "from-amber-400 to-orange-500" };
    return { title: "Requires Review", desc: "Spend some time rereading chapters and retake this quiz.", color: "from-rose-400 to-pink-500" };
  };

  const feedback = getScoreFeedback(score);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      {/* Score Summary Banner */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Radial score gauge placeholder */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Background track */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-indigo-500 gauge-glow"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-100 font-mono">{score}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Grade</span>
              </div>
            </div>
          </div>

          {/* Feedback details */}
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Quiz Completed
            </span>
            <h2 className={`text-3xl font-extrabold bg-gradient-to-r ${feedback.color} bg-clip-text text-transparent`}>
              {feedback.title}
            </h2>
            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
              {feedback.desc}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date().toLocaleDateString()}
              </span>
              <span>•</span>
              <span>Block: {results.block === 'c1-4' ? 'Chapters 1-4' : 'Chapters 5-8'}</span>
              <span>•</span>
              <span>Test: {results.test.replace('_', ' ').toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Score Grid Matrix */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
          <div className="text-center p-3 bg-slate-900/40 rounded-xl border border-slate-900">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">Total Qs</span>
            <span className="text-xl md:text-2xl font-bold text-slate-100">{total}</span>
          </div>
          <div className="text-center p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <span className="text-xs text-emerald-500/80 font-semibold uppercase tracking-wider block mb-1">Correct</span>
            <span className="text-xl md:text-2xl font-bold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} />
              {correct}
            </span>
          </div>
          <div className="text-center p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
            <span className="text-xs text-rose-500/80 font-semibold uppercase tracking-wider block mb-1">Incorrect</span>
            <span className="text-xl md:text-2xl font-bold text-rose-400 flex items-center justify-center gap-1.5">
              <XCircle size={16} />
              {incorrect}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onRetake}
          className="w-full btn-premium py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/15"
        >
          <RotateCcw size={18} />
          <span>Retake Quiz Variant</span>
        </button>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
        >
          <Home size={18} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Review Section Heading & Filter */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award size={20} className="text-indigo-400" />
            Detailed Question Review
          </h3>

          {/* Filters */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`py-1.5 px-3 rounded-lg transition-all ${
                filter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({total})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`py-1.5 px-3 rounded-lg transition-all ${
                filter === 'correct' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Correct ({correct})
            </button>
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`py-1.5 px-3 rounded-lg transition-all ${
                filter === 'incorrect' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Incorrect ({incorrect})
            </button>
          </div>
        </div>

        {/* Question Review Accordion */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center p-8 bg-slate-900/30 rounded-2xl border border-slate-900 text-slate-400">
            <AlertCircle size={24} className="mx-auto mb-2 text-slate-600" />
            <p className="text-sm">No questions match the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const originalIdx = questions.findIndex(originalQ => originalQ.questionNumber === q.questionNumber);
              const userAnswer = userAnswers[q.questionNumber];
              const correctOption = q.answerOptions.find(o => o.isCorrect)?.text;
              const isCorrect = userAnswer === correctOption;
              const isExpanded = expandedIndex === idx;

              const correctRationale = q.answerOptions.find(o => o.isCorrect)?.rationale || "Core marketing theory verified.";
              const selectedRationale = q.answerOptions.find(o => o.text === userAnswer)?.rationale || "Core marketing theory verified.";

              return (
                <div
                  key={idx}
                  className={`bg-slate-900/40 border rounded-xl overflow-hidden transition-all duration-350 ${
                    isCorrect 
                      ? 'border-emerald-500/10 hover:border-emerald-500/30' 
                      : 'border-rose-500/10 hover:border-rose-500/30'
                  }`}
                >
                  {/* Collapsible header */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="w-full text-left p-4 flex justify-between items-start gap-4 hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex gap-3 items-start">
                      <span className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <XCircle size={18} className="text-rose-400" />
                        )}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Question {originalIdx + 1}</span>
                          {!userAnswer && (
                            <span className="text-[8px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Unanswered</span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200 mt-1 leading-relaxed">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <span className="text-slate-500 mt-0.5">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* Collapsible panel body */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-900 space-y-4 text-xs md:text-sm bg-slate-950/20">
                      
                      {/* Comparison blocks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* User choice */}
                        <div className={`p-3 rounded-lg border ${
                          isCorrect ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'
                        }`}>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Your Selection</span>
                          <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {userAnswer || 'No Option Selected'}
                          </span>
                          {userAnswer && (
                            <p className="text-[11px] text-slate-400 mt-2 italic font-light">
                              Rationale: "{selectedRationale}"
                            </p>
                          )}
                        </div>

                        {/* Correct reference */}
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                          <span className="text-[10px] text-emerald-500/80 uppercase font-semibold block mb-1">Correct Answer</span>
                          <span className="font-bold text-emerald-400">{correctOption}</span>
                          <p className="text-[11px] text-slate-400 mt-2 italic font-light">
                            Rationale: "{correctRationale}"
                          </p>
                        </div>
                      </div>

                      {/* Explanation box */}
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900">
                        <span className="text-[10px] text-indigo-400 uppercase font-semibold block mb-1">Mastery Explanation</span>
                        <p className="text-slate-300 font-light leading-relaxed">
                          {correctRationale}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
