import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { HelpCircle, ChevronLeft, ChevronRight, Eye, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  validatedAnswer, // For Practice Mode: { isCorrect, selectedOption } or null
  mode,
  onSelectOption,
  onNext,
  onPrev
}) {
  const [isHintOpen, setIsHintOpen] = useState(false);

  // Close hint when moving to another question
  useEffect(() => {
    setIsHintOpen(false);
  }, [questionIndex]);

  const { questionText, answerOptions, hint } = question;
  // Note: some JSONs have keys like "question" instead of "questionText"
  const text = question.question || question.questionText;

  // Find correct answer's rationale to display
  const getSelectedRationale = () => {
    if (!selectedAnswer) return null;
    const selectedObj = answerOptions.find(opt => opt.text === selectedAnswer);
    return selectedObj?.rationale || "This option represents a standard marketing concept in the curriculum.";
  };

  const getCorrectRationale = () => {
    const correctObj = answerOptions.find(opt => opt.isCorrect);
    return correctObj?.rationale || "This option accurately represents the core marketing theory detailed in the curriculum.";
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-2 space-y-6 animate-fade-in">
      
      {/* Question Main Panel */}
      <GlassCard className="relative overflow-hidden">
        {/* Subtle accent tag */}
        <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 w-full"></div>

        {/* Question Header & Hint Toggle */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Q. {questionIndex + 1}
            </span>
          </div>

          {hint && (
            <button
              type="button"
              onClick={() => setIsHintOpen(!isHintOpen)}
              className={`flex items-center gap-1 text-xs font-semibold py-1.5 px-3.5 rounded-xl border transition-all duration-300 ${
                isHintOpen 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              <HelpCircle size={14} />
              <span>{isHintOpen ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <h3 className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed mb-8">
          {text}
        </h3>

        {/* Hint Accordion Block */}
        {hint && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isHintOpen ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-sm leading-relaxed flex items-start gap-3">
              <Eye size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-xs uppercase tracking-wide text-amber-400">Study Hint</span>
                {hint}
              </div>
            </div>
          </div>
        )}

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 gap-4">
          {answerOptions.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = selectedAnswer === option.text;
            const isCorrectOption = option.isCorrect;

            let buttonStyle = 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950/40';
            let letterStyle = 'bg-slate-800 text-slate-400';

            if (mode === 'practice') {
              const isLocked = !!validatedAnswer;

              if (isLocked) {
                // If this option is correct, highlight green
                if (isCorrectOption) {
                  buttonStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200 font-medium shadow-md shadow-emerald-500/5';
                  letterStyle = 'bg-emerald-500 text-white';
                }
                // If user selected this wrong option, highlight red
                else if (isSelected) {
                  buttonStyle = 'bg-rose-500/10 border-rose-500/50 text-rose-200 font-medium shadow-md shadow-rose-500/5';
                  letterStyle = 'bg-rose-500 text-white';
                }
                // Neutral disabled options
                else {
                  buttonStyle = 'bg-slate-950/20 border-slate-900 text-slate-500 cursor-not-allowed opacity-50';
                  letterStyle = 'bg-slate-900/50 text-slate-600';
                }
              } else {
                // Not answered yet
                if (isSelected) {
                  buttonStyle = 'bg-indigo-600/30 border-indigo-400 text-indigo-200';
                  letterStyle = 'bg-indigo-500 text-white';
                }
              }
            } else {
              // Exam Mode: simple selected state, allows changing
              if (isSelected) {
                buttonStyle = 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-500/10 font-medium';
                letterStyle = 'bg-indigo-500 text-white';
              }
            }

            const isLocked = mode === 'practice' && !!validatedAnswer;

            return (
              <button
                type="button"
                key={idx}
                disabled={isLocked}
                onClick={() => onSelectOption(option.text)}
                className={`w-full flex items-center gap-4 text-left p-4.5 rounded-xl border text-sm md:text-base transition-all duration-300 group cursor-pointer ${buttonStyle}`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${letterStyle}`}>
                  {letter}
                </span>
                <span className="leading-snug flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Practice Mode Rationale Panel */}
        {mode === 'practice' && validatedAnswer && (
          <div className="mt-8 pt-6 border-t border-slate-800/80 animate-fade-in">
            {validatedAnswer.isCorrect ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-slate-200 text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={18} />
                  <span>Correct Answer!</span>
                </div>
                <p className="text-slate-300 font-light pl-6">
                  <span className="font-semibold text-slate-200">Explanation:</span> {getCorrectRationale()}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Incorrect alert */}
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-slate-200 text-sm leading-relaxed space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <XCircle size={18} />
                    <span>Incorrect Selection</span>
                  </div>
                  <p className="text-slate-300 font-light pl-6">
                    <span className="font-semibold text-slate-200">Your choice rationale:</span> {getSelectedRationale()}
                  </p>
                </div>

                {/* Correct answer reference */}
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-slate-200 text-sm leading-relaxed space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-500/80 font-bold text-xs uppercase tracking-wide">
                    <CheckCircle2 size={16} />
                    <span>Correct Reference</span>
                  </div>
                  <p className="text-slate-400 font-light pl-6">
                    <span className="font-semibold text-slate-300 text-xs">Correct rationale:</span> {getCorrectRationale()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={questionIndex === 0}
          className={`flex items-center gap-1.5 py-3 px-6 rounded-xl border text-sm font-bold transition-all duration-300 ${
            questionIndex === 0
              ? 'bg-slate-950/20 border-slate-950 text-slate-600 cursor-not-allowed'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100 cursor-pointer'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={questionIndex === totalQuestions - 1}
          className={`flex items-center gap-1.5 py-3 px-6 rounded-xl border text-sm font-bold transition-all duration-300 ${
            questionIndex === totalQuestions - 1
              ? 'bg-slate-950/20 border-slate-950 text-slate-600 cursor-not-allowed'
              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100 cursor-pointer'
          }`}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
