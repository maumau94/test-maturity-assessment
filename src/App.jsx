import React from 'react';
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
      <h1>Landing Page</h1> {/* Testcontent */}
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

const QuestionsWrapper = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (answers) => {
    console.log('Assessment answers:', answers);
    navigate('/results');
  };

  return <QuestionsPage onSubmit={handleSubmit} />;
};

const ResultsWrapper = () => {
  return <ResultsPage />;
};

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/team-info" element={<TeamInformationWrapper />} />
          <Route path="/questions" element={<QuestionsWrapper />} />
          <Route path="/results" element={<ResultsWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
