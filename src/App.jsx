import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TeamInformationPage from './components/TeamInformationPage';
import QuestionsPage from './components/QuestionsPage';
import ResultsPage from './components/ResultsPage';

const LandingPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleStartAssessment = () => {
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <LandingPage 
        onStartClick={handleStartAssessment} 
        onLoginClick={handleLogin} 
      />
    </div>
  );
};

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    navigate('/team-info');
  };

  return <LoginPage onSubmit={handleSubmit} />;
};

const TeamInformationWrapper = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (formData) => {
    console.log('Team Information:', formData);
    navigate('/questions');
  };

  return <TeamInformationPage onSubmit={handleSubmit} />;
};

const QuestionsWrapper = ({ setAssessmentResults }) => {
  const navigate = useNavigate();
  
  const handleSubmit = (results) => {
    console.log('Assessment results:', results);
    setAssessmentResults(results); // Sla de resultaten op in de state
    navigate('/results');
  };

  return <QuestionsPage onSubmit={handleSubmit} />;
};

const ResultsWrapper = ({ assessmentResults }) => {
  return <ResultsPage assessmentResults={assessmentResults} />;
};

function App() {
  // State voor de assessment resultaten
  const [assessmentResults, setAssessmentResults] = useState(null);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/team-info" element={<TeamInformationWrapper />} />
          <Route 
            path="/questions" 
            element={<QuestionsWrapper setAssessmentResults={setAssessmentResults} />} 
          />
          <Route 
            path="/results" 
            element={<ResultsWrapper assessmentResults={assessmentResults} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;