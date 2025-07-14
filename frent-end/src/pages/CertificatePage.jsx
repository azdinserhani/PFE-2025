import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { FaMedal, FaDownload, FaShare, FaTrophy } from "react-icons/fa";
import { useSelector } from "react-redux";

const CertificatePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { user } = useSelector((state) => state.user);
  
  const [examResult, setExamResult] = useState(null);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const score = searchParams.get('score');

  useEffect(() => {
    // Load exam result from localStorage
    try {
      const storedResult = localStorage.getItem(`examResult_${id}`);
      if (storedResult) {
        setExamResult(JSON.parse(storedResult));
      }
    } catch (error) {
      console.error('Error loading exam result:', error);
    }
  }, [id]);

  const handleDownload = () => {
    // In a real application, this would generate a PDF certificate
    alert('Certificate download functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I completed my course!',
        text: `I just completed a course exam with a score of ${score}%!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (!score || parseFloat(score) < 70) {
    return (
      <div
        className="container mx-auto p-6 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
            Certificate not available
          </h2>
          <p className="mb-6" style={{ color: theme.secondary }}>
            You need to pass the exam with a score of 70% or higher to receive a certificate.
          </p>
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

  return (
    <div
      className="container mx-auto p-6 min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaTrophy
              size={64}
              style={{ color: '#FFD700' }}
            />
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: theme.primary }}
          >
            Congratulations!
          </h1>
          <p
            className="text-xl"
            style={{ color: theme.text }}
          >
            You have successfully completed the course exam
          </p>
        </div>

        {/* Certificate */}
        <div
          className="relative p-8 md:p-12 rounded-lg shadow-2xl mb-8"
          style={{
            backgroundColor: theme.cardBg,
            border: `4px solid ${theme.primary}`,
            backgroundImage: `linear-gradient(45deg, ${theme.cardBg} 25%, transparent 25%), 
                             linear-gradient(-45deg, ${theme.cardBg} 25%, transparent 25%), 
                             linear-gradient(45deg, transparent 75%, ${theme.cardBg} 75%), 
                             linear-gradient(-45deg, transparent 75%, ${theme.cardBg} 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* Certificate Border */}
          <div
            className="absolute inset-4 border-2 rounded-lg"
            style={{ borderColor: `${theme.primary}40` }}
          />
          
          {/* Certificate Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <h2
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: theme.primary }}
              >
                CERTIFICATE OF COMPLETION
              </h2>
              <div
                className="w-32 h-1 mx-auto rounded"
                style={{ backgroundColor: theme.primary }}
              />
            </div>

            <div className="mb-8">
              <p
                className="text-lg mb-4"
                style={{ color: theme.text }}
              >
                This is to certify that
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: theme.primary }}
              >
                {user?.name || 'Student Name'}
              </h3>
              <p
                className="text-lg mb-4"
                style={{ color: theme.text }}
              >
                has successfully completed the course examination with a score of
              </p>
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-2xl font-bold"
                style={{
                  backgroundColor: `${theme.primary}20`,
                  color: theme.primary
                }}
              >
                <FaMedal />
                {parseFloat(score).toFixed(1)}%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: theme.secondary }}
                >
                  Date of Completion
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: theme.text }}
                >
                  {currentDate}
                </p>
              </div>
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: theme.secondary }}
                >
                  Certificate ID
                </p>
                <p
                  className="text-lg font-semibold font-mono"
                  style={{ color: theme.text }}
                >
                  ED-{id}-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="w-48 h-1 rounded"
                style={{ backgroundColor: theme.primary }}
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className="absolute top-4 left-4 w-8 h-8 rounded-full"
            style={{ backgroundColor: `${theme.primary}30` }}
          />
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full"
            style={{ backgroundColor: `${theme.primary}30` }}
          />
          <div
            className="absolute bottom-4 left-4 w-8 h-8 rounded-full"
            style={{ backgroundColor: `${theme.primary}30` }}
          />
          <div
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full"
            style={{ backgroundColor: `${theme.primary}30` }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:-translate-y-[1px]"
            style={{
              backgroundColor: theme.primary,
              color: theme.cardBg,
              boxShadow: `0 4px 12px ${theme.primary}30`,
            }}
          >
            <FaDownload />
            Download Certificate
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300"
            style={{
              backgroundColor: theme.background,
              color: theme.primary,
              borderColor: theme.primary,
              borderWidth: "1px",
            }}
          >
            <FaShare />
            Share Achievement
          </button>
        </div>

        {/* Achievement stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-lg"
          style={{ backgroundColor: theme.cardBg }}
        >
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: theme.primary }}
            >
              {parseFloat(score).toFixed(0)}%
            </div>
            <p style={{ color: theme.secondary }}>Final Score</p>
          </div>
          
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: theme.primary }}
            >
              {examResult?.answers ? Object.keys(examResult.answers).length : 0}
            </div>
            <p style={{ color: theme.secondary }}>Questions Answered</p>
          </div>
          
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: '#10B981' }}
            >
              PASSED
            </div>
            <p style={{ color: theme.secondary }}>Status</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/myLearning')}
            className="px-8 py-3 rounded-md font-medium transition-all duration-300"
            style={{
              backgroundColor: theme.background,
              color: theme.secondary,
              borderColor: theme.secondary,
              borderWidth: "1px",
            }}
          >
            Back to My Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage; 