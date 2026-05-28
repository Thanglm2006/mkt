import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { BookOpen, GraduationCap, Flame, Play, Clock, History, Award, CheckCircle2, Trash2 } from 'lucide-react';

export default function Dashboard({
  history,
  onStartQuiz,
  onClearHistory
}) {
  const [selectedBlock, setSelectedBlock] = useState('c1-4'); // 'c1-4' | 'c2-8'
  const [selectedTest, setSelectedTest] = useState('test_1'); // 'test_1' | 'test_2' | 'test_3' | 'test_4'
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' | 'exam'

  const tests = [
    { id: 'test_1', name: 'Practice Test 1', desc: '50 standard marketing questions' },
    { id: 'test_2', name: 'Practice Test 2', desc: '50 core marketing concepts' },
    { id: 'test_3', name: 'Practice Test 3', desc: '50 marketing analysis questions' },
    { id: 'test_4', name: 'Practice Test 4', desc: '50 advanced marketing applications' }
  ];

  const handleStart = () => {
    onStartQuiz({
      block: selectedBlock,
      test: selectedTest,
      mode: quizMode
    });
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Header */}
      <header className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 select-none">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent font-display italic">
            Lệ Huyền
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Marketing Quiz Practice Platform
        </p>
        <div className="h-[2px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -z-10"></div>
            
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <BookOpen size={20} />
              </span>
              1. Choose Learning Block
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Block 1 */}
              <button
                type="button"
                id="btn-block-c1-4"
                onClick={() => setSelectedBlock('c1-4')}
                className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 ${
                  selectedBlock === 'c1-4'
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center w-full mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    selectedBlock === 'c1-4' ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Chapters 1 - 4
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedBlock === 'c1-4' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                  }`}>
                    {selectedBlock === 'c1-4' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Fundamentals & Markets</h3>
                <p className="text-xs text-slate-400">
                  Covers Intro to Marketing, Environment, MIS, Customer Behavior, and Customer-Value Strategies.
                </p>
              </button>

              {/* Block 2 */}
              <button
                type="button"
                id="btn-block-c2-8"
                onClick={() => setSelectedBlock('c2-8')}
                className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 ${
                  selectedBlock === 'c2-8'
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center w-full mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    selectedBlock === 'c2-8' ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Chapters 5 - 8
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedBlock === 'c2-8' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                  }`}>
                    {selectedBlock === 'c2-8' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Marketing Mix (4Ps)</h3>
                <p className="text-xs text-slate-400">
                  Deep dive into Product planning, Pricing strategies, Distribution channels (Place), and Promotion mixes.
                </p>
              </button>
            </div>
          </GlassCard>

          {/* Test and Mode settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Selector */}
            <GlassCard>
              <h2 className="text-xl font-bold text-slate-100 mb-5 flex items-center gap-2">
                <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
                  <Award size={20} />
                </span>
                2. Select Test Variant
              </h2>
              
              <div className="space-y-3">
                <label htmlFor="test-select-dropdown" className="sr-only">Choose a test variant</label>
                <select
                  id="test-select-dropdown"
                  value={selectedTest}
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 py-3 px-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                >
                  {tests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (50 Qs)
                    </option>
                  ))}
                </select>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-900/80 mt-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide block mb-1">Variant Overview</span>
                  <p className="text-sm text-slate-300 font-medium">
                    {tests.find(t => t.id === selectedTest)?.desc}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Dynamic local structure load simulator active.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Mode Selector */}
            <GlassCard>
              <h2 className="text-xl font-bold text-slate-100 mb-5 flex items-center gap-2">
                <span className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg">
                  <Clock size={20} />
                </span>
                3. Choose Mode
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Practice Mode */}
                <button
                  type="button"
                  id="btn-mode-practice"
                  onClick={() => setQuizMode('practice')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 ${
                    quizMode === 'practice'
                      ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/5'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Flame size={24} className={`mb-2 ${quizMode === 'practice' ? 'text-rose-400' : 'text-slate-400'}`} />
                  <span className="text-sm font-bold text-slate-200">Practice</span>
                  <span className="text-[10px] text-slate-500 mt-1">Instant Rationale</span>
                </button>

                {/* Exam Mode */}
                <button
                  type="button"
                  id="btn-mode-exam"
                  onClick={() => setQuizMode('exam')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 ${
                    quizMode === 'exam'
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md shadow-emerald-500/5'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <GraduationCap size={24} className={`mb-2 ${quizMode === 'exam' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-sm font-bold text-slate-200">Exam</span>
                  <span className="text-[10px] text-slate-500 mt-1">Timer (50 Mins)</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-900 leading-normal">
                {quizMode === 'practice' ? (
                  <p>🟢 **Practice Mode**: Rationale is shown immediately after answering each question. No timer constraints. Relaxed environment.</p>
                ) : (
                  <p>⏳ **Exam Mode**: Strict 50-minute timer for the whole test. Results and rationales are revealed only after submission at the end.</p>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Action Trigger */}
          <button
            type="button"
            id="btn-start-quiz"
            onClick={handleStart}
            className="w-full btn-premium py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
          >
            <Play size={20} className="fill-current" />
            Start Practice Session
          </button>
        </div>

        {/* History / Sidebar */}
        <div className="space-y-6">
          <GlassCard className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <History size={18} className="text-indigo-400" />
                  Your Progress
                </h2>
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearHistory}
                    title="Clear history"
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800/50"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Award size={20} className="text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-400">No sessions recorded yet.</p>
                  <p className="text-xs text-slate-600 mt-2">Complete a test variant to see your grade matrix here.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {history.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-2 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold uppercase">
                            {item.block === 'c1-4' ? 'Chapters 1-4' : 'Chapters 5-8'}
                          </span>
                          <h4 className="text-sm font-bold text-slate-200 mt-0.5">
                            {item.test.replace('_', ' ').toUpperCase()}
                          </h4>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                          item.mode === 'exam' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.mode === 'exam' ? 'Exam' : 'Practice'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-1 border-t border-slate-800/50 pt-2 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span className="font-bold text-slate-300">{item.score}%</span>
                          <span>({item.correct}/{item.total})</span>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {item.date ? new Date(item.date).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {history.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span>Completed Sessions:</span>
                  <span className="font-bold text-slate-200">{history.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-400 mt-1">
                  <span>Average Score:</span>
                  <span className="font-bold text-indigo-400">
                    {Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)}%
                  </span>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
