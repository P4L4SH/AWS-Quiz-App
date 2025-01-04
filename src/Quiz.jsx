import React, { useState } from 'react';
import quizData from './quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null);
        setSelectedAnswer("");
      } else {
        setShowScore(true);
      }
    }, 2500);
  };

  const getProgressBarWidth = () => {
    return `${((currentQuestion + 1) / quizData.length) * 100}%`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-zinc-800 rounded-xl shadow-lg">
      {showScore ? (
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete! 🎉</h2>
          <div className="text-4xl font-bold text-green-400 mb-4">
            You scored {score} out of {quizData.length}
          </div>
          <div className="text-gray-300 text-lg">
            {score === quizData.length ? 'Perfect Score! 🏆' : 
             score >= quizData.length * 0.7 ? 'Great job! 🌟' :
             score >= quizData.length * 0.5 ? 'Good effort! 👍' : 'Keep practicing! 💪'}
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full bg-zinc-900 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: getProgressBarWidth() }}
            />
          </div>

          {/* Question Counter */}
          <div className="flex justify-between items-center text-gray-400 mb-6">
            <span className="text-sm">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm">
              Score: {score}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-white mb-8">
            {quizData[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {quizData[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                disabled={selectedAnswer !== ""}
                className={`w-full p-4 text-left rounded-lg transition-all duration-200 
                  ${selectedAnswer === "" ? 
                    "bg-zinc-700 hover:bg-zinc-600 text-white" : 
                    selectedAnswer === option ?
                      (isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white") :
                      option === quizData[currentQuestion].answer && selectedAnswer !== "" ?
                        "bg-green-600 text-white" : "bg-zinc-700 text-white opacity-50"
                  }
                  ${selectedAnswer === "" ? "transform hover:scale-102" : ""}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {selectedAnswer && (
            <div className={`mt-6 text-center text-lg font-medium
              ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? (
                <div className="flex items-center justify-center space-x-2">
                  <span>Correct!</span> 
                  <span className="text-2xl">🎉</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span>Incorrect</span>
                    <span className="text-2xl">😢</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    The correct answer was: {quizData[currentQuestion].answer}
                  </div>
                </div>
              )}
              {quizData[currentQuestion].explanation && (
                <div className="mt-4 text-sm text-gray-400 p-4 bg-zinc-700 rounded-lg">
                  {quizData[currentQuestion].explanation}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;