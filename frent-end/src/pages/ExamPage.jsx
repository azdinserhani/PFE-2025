import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { FaCheck, FaClock, FaQuestionCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  const [examData, setExamData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [examStarted, setExamStarted] = useState(false);

  // Load exam data
  useEffect(() => {
    try {
      // For now, we'll load from localStorage. In a real app, this would be an API call
      const storedExam = localStorage.getItem('exams');
      if (storedExam) {
        const exam = JSON.parse(storedExam);
        setExamData(exam);
      } else {
        // Fallback sample exam data
        setExamData({
          title: "Sample Course Exam",
          description: "This is a sample exam to test your knowledge.",
          questions: [
            {
              question: "What is React?",
              options: ["A library", "A framework", "A language", "A database"],
              correctAnswer: 0
            },
            {
              question: "What is JSX?",
              options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
              correctAnswer: 0
            }
          ]
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading exam data:', error);
      setIsLoading(false);
    }
  }, [id]);

  // Timer effect
  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    if (!examData?.questions) return 0;
    
    let correctAnswers = 0;
    examData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return (correctAnswers / examData.questions.length) * 100;
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    
    try {
      const score = calculateScore();
      
      // Save exam result
      const examResult = {
        examId: id,
        score: score,
        passed: score >= 70,
        submittedAt: new Date().toISOString(),
        answers: userAnswers
      };
      
      localStorage.setItem(`examResult_${id}`, JSON.stringify(examResult));
      
      // Redirect based on score
      if (score >= 70) {
        navigate(`/certificate/${id}?score=${score}`);
      } else {
        alert(`Exam completed! Your score: ${score.toFixed(1)}%. You need 70% or higher to pass.`);
        navigate('/myLearning');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startExam = () => {
    setExamStarted(true);
  };

  if (isLoading) {
    return (
      <div
        className="container mx-auto p-6 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex items-center gap-3" style={{ color: theme.text }}>
          <AiOutlineLoading3Quarters className="animate-spin" size={24} />
          Loading exam...
        </div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div
        className="container mx-auto p-6 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
            Exam not found
          </h2>
          <button
            onClick={() => navigate('/myLearning')}
            className="px-6 py-3 rounded-md font-medium"
            style={{
              backgroundColor: theme.primary,
              color: theme.cardBg,
            }}
          >
            Back to My Learning
          </button>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div
        className="container mx-auto p-6 min-h-screen"
        style={{ backgroundColor: theme.background }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="shadow-md p-8 rounded-lg text-center"
            style={{ backgroundColor: theme.cardBg }}
          >
            <FaQuestionCircle
              size={64}
              className="mx-auto mb-6"
              style={{ color: theme.primary }}
            />
            <h1
              className="text-3xl font-bold mb-4"
              style={{ color: theme.primary }}
            >
              {examData.title}
            </h1>
            <p
              className="text-lg mb-6"
              style={{ color: theme.text }}
            >
              {examData.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
                <FaClock className="mx-auto mb-2" style={{ color: theme.primary }} />
                <p className="font-semibold" style={{ color: theme.text }}>Duration</p>
                <p style={{ color: theme.secondary }}>60 minutes</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
                <FaQuestionCircle className="mx-auto mb-2" style={{ color: theme.primary }} />
                <p className="font-semibold" style={{ color: theme.text }}>Questions</p>
                <p style={{ color: theme.secondary }}>{examData.questions?.length || 0}</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
                <FaCheck className="mx-auto mb-2" style={{ color: theme.primary }} />
                <p className="font-semibold" style={{ color: theme.text }}>Pass Score</p>
                <p style={{ color: theme.secondary }}>70%</p>
              </div>
            </div>

            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${theme.primary}10` }}>
              <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
                Instructions:
              </h3>
              <ul className="text-left space-y-2" style={{ color: theme.secondary }}>
                <li>• You have 60 minutes to complete the exam</li>
                <li>• You need to score 70% or higher to pass</li>
                <li>• Once started, you cannot pause the exam</li>
                <li>• Make sure you have a stable internet connection</li>
                <li>• Click on your preferred answer for each question</li>
              </ul>
            </div>

            <button
              onClick={startExam}
              className="px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 transform hover:-translate-y-[1px]"
              style={{
                backgroundColor: theme.primary,
                color: theme.cardBg,
                boxShadow: `0 4px 12px ${theme.primary}30`,
              }}
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6 min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with timer */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: theme.primary }}
          >
            {examData.title}
          </h1>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-md"
            style={{ 
              backgroundColor: timeRemaining < 300 ? '#fee2e2' : theme.cardBg,
              color: timeRemaining < 300 ? '#dc2626' : theme.text
            }}
          >
            <FaClock />
            <span className="font-mono text-lg font-bold">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span style={{ color: theme.text }}>
              Question {currentQuestion + 1} of {examData.questions?.length || 0}
            </span>
            <span style={{ color: theme.secondary }}>
              {Object.keys(userAnswers).length} / {examData.questions?.length || 0} answered
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full"
            style={{ backgroundColor: theme.background }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: theme.primary,
                width: `${((currentQuestion + 1) / (examData.questions?.length || 1)) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Current Question */}
        {examData.questions && examData.questions[currentQuestion] && (
          <div
            className="shadow-md p-6 rounded-lg mb-6"
            style={{ backgroundColor: theme.cardBg }}
          >
            <h2
              className="text-xl font-semibold mb-6"
              style={{ color: theme.text }}
            >
              {examData.questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {examData.questions[currentQuestion].options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className={`
                    flex items-center p-4 rounded-md cursor-pointer transition-all duration-200
                    ${userAnswers[currentQuestion] === optIndex ? 'ring-2' : ''}
                  `}
                  style={{
                    backgroundColor: userAnswers[currentQuestion] === optIndex 
                      ? `${theme.primary}10` 
                      : theme.background,
                    ringColor: theme.primary,
                    borderColor: theme.border,
                    borderWidth: "1px",
                  }}
                  onClick={() => handleAnswerSelect(currentQuestion, optIndex)}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    checked={userAnswers[currentQuestion] === optIndex}
                    onChange={() => handleAnswerSelect(currentQuestion, optIndex)}
                    className="mr-3"
                    style={{ accentColor: theme.primary }}
                  />
                  <span style={{ color: theme.text }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className={`
              px-6 py-3 rounded-md font-medium transition-all duration-300
              ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            style={{
              backgroundColor: theme.background,
              color: theme.secondary,
              borderColor: theme.secondary,
              borderWidth: "1px",
            }}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {examData.questions?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`
                  w-8 h-8 rounded-full text-sm font-medium transition-all duration-200
                  ${index === currentQuestion ? 'ring-2' : ''}
                `}
                style={{
                  backgroundColor: userAnswers[index] !== undefined 
                    ? theme.primary 
                    : theme.background,
                  color: userAnswers[index] !== undefined 
                    ? theme.cardBg 
                    : theme.text,
                  ringColor: theme.primary,
                  borderColor: theme.border,
                  borderWidth: "1px",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === (examData.questions?.length || 1) - 1 ? (
            <button
              onClick={handleSubmitExam}
              disabled={isSubmitting || Object.keys(userAnswers).length < (examData.questions?.length || 0)}
              className={`
                px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:-translate-y-[1px]
                ${isSubmitting || Object.keys(userAnswers).length < (examData.questions?.length || 0) 
                  ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{
                backgroundColor: theme.primary,
                color: theme.cardBg,
                boxShadow: `0 2px 6px ${theme.primary}30`,
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit Exam'
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min((examData.questions?.length || 1) - 1, currentQuestion + 1))}
              className="px-6 py-3 rounded-md font-medium transition-all duration-300"
              style={{
                backgroundColor: theme.primary,
                color: theme.cardBg,
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPage; 