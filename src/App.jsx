import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import ResultView from './components/ResultView';

// Import local JSON structures dynamically
import c1_4Data from './data/c1-4.json';
import c2_8Data from './data/c2-8.json';

export default function App() {
  // Screens: 'dashboard' | 'quiz' | 'result'
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  
  // History list persistent in Local Storage
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('le_huyen_quiz_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Session parameters
  const [activeBlock, setActiveBlock] = useState('c1-4'); // 'c1-4' | 'c2-8'
  const [activeTest, setActiveTest] = useState('test_1'); // 'test_1' | 'test_2' | 'test_3' | 'test_4'
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' | 'exam'
  
  // Question & Evaluation lists
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // User answers map: { [questionNumber]: selectedOptionText }
  const [userAnswers, setUserAnswers] = useState({});
  // Validated answers for Practice mode: { [questionNumber]: { isCorrect, selectedOption } }
  const [validatedAnswers, setValidatedAnswers] = useState({});

  // Countdown timer for Exam Mode (in seconds)
  const [timerSeconds, setTimerSeconds] = useState(3000); // 50 minutes standard for 50 questions
  const timerIntervalRef = useRef(null);

  // Sync history to Local Storage
  useEffect(() => {
    localStorage.setItem('le_huyen_quiz_history', JSON.stringify(history));
  }, [history]);

  // Handle countdown timer ticker in Exam Mode
  useEffect(() => {
    if (currentScreen === 'quiz' && quizMode === 'exam') {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            // Auto submit when time runs out!
            clearInterval(timerIntervalRef.current);
            alert("⏰ Time is up! Your exam will be submitted automatically.");
            triggerSubmitQuiz(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentScreen, quizMode]);

  // Initializing quiz session
  const handleStartQuiz = ({ block, test, mode }) => {
    setActiveBlock(block);
    setActiveTest(test);
    setQuizMode(mode);

    // Dynamic resolution based on blocks
    const dataset = block === 'c1-4' ? c1_4Data : c2_8Data;
    const testQuestions = dataset[test];

    if (!testQuestions || testQuestions.length === 0) {
      alert("Error: The selected test variant has no questions.");
      return;
    }

    setQuestions(testQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setValidatedAnswers({});
    
    if (mode === 'exam') {
      // 50 minutes timer (3000 seconds)
      setTimerSeconds(3000);
    }
    
    setCurrentScreen('quiz');
  };

  // Option selection handler
  const handleSelectOption = (optionText) => {
    const currentQ = questions[currentQuestionIndex];
    const qNum = currentQ.questionNumber;

    if (quizMode === 'practice') {
      // If already answered, lock choice
      if (validatedAnswers[qNum]) return;

      const correctOption = currentQ.answerOptions.find(o => o.isCorrect)?.text;
      const isCorrect = optionText === correctOption;

      // Update state
      setUserAnswers(prev => ({ ...prev, [qNum]: optionText }));
      setValidatedAnswers(prev => ({
        ...prev,
        [qNum]: {
          isCorrect,
          selectedOption: optionText
        }
      }));
    } else {
      // Exam Mode: simple answer capture, allows overwrite
      setUserAnswers(prev => ({ ...prev, [qNum]: optionText }));
    }
  };

  // Submission handler
  const triggerSubmitQuiz = (forceAutoSubmit = false) => {
    if (!forceAutoSubmit) {
      const unansweredCount = questions.length - Object.keys(userAnswers).length;
      let confirmMsg = "Are you sure you want to submit your quiz and see your score?";
      if (unansweredCount > 0) {
        confirmMsg = `⚠️ You have ${unansweredCount} unanswered questions remaining. Are you sure you want to submit and complete the quiz?`;
      }
      if (!window.confirm(confirmMsg)) return;
    }

    // Evaluate answers
    let correctCount = 0;
    questions.forEach((q) => {
      const userAnswer = userAnswers[q.questionNumber];
      const correctOption = q.answerOptions.find(o => o.isCorrect)?.text;
      if (userAnswer === correctOption) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    // Save to history log
    const sessionRecord = {
      id: Date.now().toString(),
      block: activeBlock,
      test: activeTest,
      mode: quizMode,
      score: scorePercent,
      correct: correctCount,
      total: questions.length,
      date: new Date().toISOString()
    };

    setHistory(prev => [sessionRecord, ...prev]);

    // Clear timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    setCurrentScreen('result');
  };

  // Retake trigger
  const handleRetake = () => {
    setUserAnswers({});
    setValidatedAnswers({});
    setCurrentQuestionIndex(0);
    
    if (quizMode === 'exam') {
      setTimerSeconds(3000);
    }
    
    setCurrentScreen('quiz');
  };

  // Clear History log
  const handleClearHistory = () => {
    if (window.confirm("🗑️ Are you sure you want to clear your entire score history? This action is permanent.")) {
      setHistory([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-ambient-glow min-h-screen text-slate-100 font-sans">
      
      {currentScreen === 'dashboard' && (
        <Dashboard
          history={history}
          onStartQuiz={handleStartQuiz}
          onClearHistory={handleClearHistory}
        />
      )}

      {currentScreen === 'quiz' && (
        <>
          <QuizHeader
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            mode={quizMode}
            timerSeconds={timerSeconds}
            onBackToDashboard={() => {
              if (window.confirm("⚠️ Are you sure you want to exit? Your current session progress will be lost.")) {
                setCurrentScreen('dashboard');
              }
            }}
            onSubmitQuiz={() => triggerSubmitQuiz(false)}
          />
          
          <main className="flex-1 flex items-center py-6">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={userAnswers[questions[currentQuestionIndex].questionNumber]}
              validatedAnswer={validatedAnswers[questions[currentQuestionIndex].questionNumber]}
              mode={quizMode}
              onSelectOption={handleSelectOption}
              onNext={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}
              onPrev={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
            />
          </main>
        </>
      )}

      {currentScreen === 'result' && (
        <ResultView
          results={{
            block: activeBlock,
            test: activeTest,
            mode: quizMode,
            score: Math.round((questions.filter(q => userAnswers[q.questionNumber] === q.answerOptions.find(o => o.isCorrect)?.text).length / questions.length) * 100),
            correct: questions.filter(q => userAnswers[q.questionNumber] === q.answerOptions.find(o => o.isCorrect)?.text).length,
            total: questions.length,
            userAnswers: userAnswers,
            questions: questions
          }}
          onRetake={handleRetake}
          onBackToDashboard={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Persistent Elegant Footer */}
      <footer className="text-center py-6 text-xs text-slate-500 border-t border-slate-900 mt-auto bg-slate-950/20">
        <p>© {new Date().getFullYear()} Lệ Huyền - Premium Marketing Practice Engine. All rights reserved.</p>
      </footer>
    </div>
  );
}
