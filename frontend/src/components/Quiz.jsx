// src/pages/QuizzesPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Beautiful Cyber Loader Component
const CyberLoader = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        {/* Cyber grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 gap-2 w-64 h-64">
            {Array.from({length: 64}).map((_, i) => (
              <div 
                key={i} 
                className="w-6 h-6 border border-white animate-pulse"
                style={{animationDelay: `${i * 0.1}s`}}
              />
            ))}
          </div>
        </div>
        
        {/* Main loader */}
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-gray-400 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2 font-mono">LOADING QUIZ</h2>
            <p className="text-lg text-gray-300 mb-4">Preparing Security Assessment{dots}</p>
            
            <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto">
              <div className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizzesPage = () => {
  const { topic } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/ai/gemini/${topic}`);
        const json = await res.json();

        console.log("📩 API response:", json); // debug log

        if (!json.quiz || !Array.isArray(json.quiz)) {
          throw new Error("Quiz data not found in API response");
        }

        setQuizData(json.quiz);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  const handleAnswer = (qIndex, option) => {
    if (!showResults) {
      setAnswers({ ...answers, [qIndex]: option });
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quizData.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isQuizComplete = Object.keys(answers).length === quizData.length;

  if (loading) return <CyberLoader />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white border-2 border-red-500 rounded-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-black mb-4">Quiz Load Failed</h2>
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold border-2 border-black transform hover:scale-105"
          >
            <span className="mr-2">←</span>
            Back
          </button>

          {/* Toggle Button */}
          <button 
            onClick={() => setShowResults(!showResults)}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-semibold border-2 transform hover:scale-105 ${
              showResults 
                ? "bg-white text-black border-black hover:bg-gray-100" 
                : "bg-black text-white border-black hover:bg-gray-800"
            }`}
          >
            <span className="mr-2">{showResults ? "📝" : "📊"}</span>
            {showResults ? "Show Quiz" : "Show Results"}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4 font-mono capitalize">
            🎯 {topic} QUIZ
          </h1>
          <div className="w-32 h-1 bg-black mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">
            Test your knowledge and validate your cybersecurity understanding
          </p>
        </div>

        {/* Quiz Progress */}
        {!showResults && (
          <div className="bg-white border-2 border-black rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-black">Progress:</span>
              <span className="font-bold text-black">
                {Object.keys(answers).length} / {quizData.length} answered
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div 
                className="bg-black h-3 rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(answers).length / quizData.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {showResults && (
          <div className="mb-8">
            <div className={`p-8 rounded-2xl border-4 text-center ${
              score === quizData.length 
                ? "bg-green-50 border-green-500" 
                : score >= quizData.length * 0.7 
                ? "bg-yellow-50 border-yellow-500"
                : "bg-red-50 border-red-500"
            }`}>
              <div className="text-6xl mb-4">
                {score === quizData.length ? "🏆" : score >= quizData.length * 0.7 ? "👍" : "💪"}
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">
                Final Score: {score} / {quizData.length}
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                {score === quizData.length 
                  ? "Perfect! You're a cybersecurity expert!" 
                  : score >= quizData.length * 0.7 
                  ? "Great job! Keep learning to improve further."
                  : "Good effort! Review the material and try again."}
              </p>
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold border-2 border-black"
              >
                Retake Quiz 🔄
              </button>
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        <div className="space-y-8">
          {quizData.map((q, i) => (
            <div key={i} className="bg-white shadow-xl rounded-2xl p-8 border-2 border-black">
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-start mb-4">
                  <span className="inline-block w-10 h-10 bg-black text-white rounded-full text-lg font-bold flex items-center justify-center mr-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-black leading-tight">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {q.options && q.options.map((opt, j) => {
                  const isSelected = answers[i] === opt;
                  const isCorrect = opt === q.answer;
                  const isWrong = showResults && isSelected && !isCorrect;
                  const showCorrect = showResults && isCorrect;

                  return (
                    <label 
                      key={j} 
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                        showResults
                          ? showCorrect 
                            ? "bg-green-100 border-green-500 text-green-800"
                            : isWrong
                            ? "bg-red-100 border-red-500 text-red-800"
                            : "bg-gray-100 border-gray-300 text-gray-600"
                          : isSelected
                          ? "bg-black text-white border-black shadow-lg"
                          : "bg-white text-black border-gray-400 hover:border-black hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={`q${i}`}
                          value={opt}
                          onChange={() => handleAnswer(i, opt)}
                          checked={isSelected}
                          className="mr-4"
                          disabled={showResults}
                        />
                        <span className="font-medium flex-1">{opt}</span>
                        {showResults && showCorrect && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                        {showResults && isWrong && (
                          <span className="text-red-600 font-bold">✗</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Individual Question Result */}
              {showResults && answers[i] && (
                <div className="mt-4 p-4 rounded-lg border-2">
                  {answers[i] === q.answer ? (
                    <div className="text-green-700 font-bold flex items-center">
                      <span className="text-2xl mr-2">✅</span>
                      Correct! Well done.
                    </div>
                  ) : (
                    <div className="text-red-700">
                      <div className="font-bold flex items-center mb-1">
                        <span className="text-2xl mr-2">❌</span>
                        Incorrect
                      </div>
                      <div className="text-sm">
                        <strong>Your answer:</strong> {answers[i]}<br/>
                        <strong>Correct answer:</strong> {q.answer}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {!showResults && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmitQuiz}
              disabled={!isQuizComplete}
              className={`px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                isQuizComplete
                  ? "bg-black text-white hover:bg-gray-800 border-2 border-black"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300"
              }`}
            >
              {isQuizComplete ? "Submit Quiz 🚀" : `Answer All Questions (${Object.keys(answers).length}/${quizData.length})`}
            </button>
          </div>
        )}

        {/* Results View Only */}
        {showResults && !Object.keys(answers).length && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-black mb-4">No Quiz Taken Yet</h2>
            <p className="text-gray-600 mb-6">
              Toggle back to quiz mode to answer questions and see your results here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;