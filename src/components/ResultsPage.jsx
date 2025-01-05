import React from 'react';
import { ChevronRight, BarChart, ArrowUpCircle, CheckCircle, FileText, Calendar, Phone, Download } from 'lucide-react';

const ResultsPage = ({ assessmentResults }) => {
  // Bereken categorie scores op basis van assessment antwoorden
  const calculateCategoryScore = (category, answers) => {
    const categoryQuestions = questions.find(q => q.category === category).questions;
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    categoryQuestions.forEach(question => {
      const questionScores = answers[`${question.id}_scores`] || [];
      totalScore += questionScores.reduce((sum, score) => sum + score, 0);
      // Voor multiple select vragen, tel de hoogst mogelijke scores
      if (question.multiSelect) {
        const topScores = question.options
          .map(opt => opt.score)
          .sort((a, b) => b - a)
          .slice(0, 3); // Neem de top 3 hoogste scores
        maxPossibleScore += topScores.reduce((sum, score) => sum + score, 0);
      } else {
        maxPossibleScore += Math.max(...question.options.map(opt => opt.score));
      }
    });

    return Math.round((totalScore / maxPossibleScore) * 100);
  };

  // Bereken overall score
  const calculateOverallScore = (answers) => {
    const categoryScores = ['Test Scope', 'Test Dekking', 'Test Fases'].map(
      category => calculateCategoryScore(category, answers)
    );
    return Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length);
  };

  // Verwerk assessment resultaten
  const results = {
    overallScore: assessmentResults ? calculateOverallScore(assessmentResults.answers) : 0,
    categories: {
      'Test Scope': {
        score: assessmentResults ? calculateCategoryScore('Test Scope', assessmentResults.answers) : 0,
        actions: [
          'Definieer duidelijke rollen en verantwoordelijkheden',
          'Implementeer geautomatiseerde impact analyse',
          'Verbeter documentatie en kennisdeling',
          'Integreer security testing vroeg in het proces'
        ]
      },
      'Test Dekking': {
        score: assessmentResults ? calculateCategoryScore('Test Dekking', assessmentResults.answers) : 0,
        actions: [
          'Voer risk-based testing analyse uit',
          'Verhoog testdekking van kritieke processen',
          'Implementeer geautomatiseerde testsuites',
          'Monitor en verbeter testdekking continu'
        ]
      },
      'Test Fases': {
        score: assessmentResults ? calculateCategoryScore('Test Fases', assessmentResults.answers) : 0,
        actions: [
          'Implementeer continuous testing pipeline',
          'Automatiseer regressietesten',
          'Verkort feedback loops',
          'Integreer performance testing'
        ]
      }
    }
  };

  const getMaturityLevel = (score) => {
    if (score >= 70) return { 
      text: 'Advanced', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50' 
    };
    if (score >= 40) return { 
      text: 'Intermediate', 
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      bgLight: 'bg-yellow-50'
    };
    return { 
      text: 'Basic', 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header with Glass Effect */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Card with Modern Design */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Maturity Score</h2>
              <p className="text-gray-500 mt-1">Based on your assessment responses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
                {results.overallScore}%
              </div>
              <span className={`px-4 py-2 text-sm font-medium text-white rounded-full ${getMaturityLevel(results.overallScore).color}`}>
                {getMaturityLevel(results.overallScore).text}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getMaturityLevel(results.overallScore).color}`}
              style={{ width: `${results.overallScore}%` }}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Call to Actions */}
          <div className="md:col-span-4 space-y-6">
            {/* Growth Journey Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent mb-2">
                  Start Your Growth Journey
                </h2>
                <p className="text-gray-500">Get personalized guidance to improve your testing maturity</p>
              </div>

              <div className="space-y-4">
                {/* Download Report Button */}
                <button className="w-full flex items-center p-4 bg-gradient-to-r from-[#1e81b0] to-blue-600 
                                text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] 
                                transition-all duration-200">
                  <Download className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Download Full Report</div>
                    <div className="text-sm opacity-90">Detailed analysis & recommendations</div>
                  </div>
                </button>

                {/* Schedule Consultation Button */}
                <button className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                                text-[#1e81b0] rounded-xl hover:shadow-md transform hover:scale-[1.02] 
                                transition-all duration-200 border border-blue-200">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Schedule Consultation</div>
                    <div className="text-sm opacity-90">Book a review session with experts</div>
                  </div>
                </button>

                {/* Contact Team Button */}
                <button className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                                text-[#1e81b0] rounded-xl hover:shadow-md transform hover:scale-[1.02] 
                                transition-all duration-200 border border-blue-200">
                  <Phone className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Contact Our Team</div>
                    <div className="text-sm opacity-90">Get answers to your questions</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Category Results */}
          <div className="md:col-span-8 space-y-6">
            {Object.entries(results.categories).map(([category, data]) => (
              <div key={category} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 
                                          transform transition-all duration-200 hover:shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMaturityLevel(data.score).color} text-white`}>
                        {getMaturityLevel(data.score).text}
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
                    {data.score}%
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getMaturityLevel(data.score).color}`}
                    style={{ width: `${data.score}%` }}
                  />
                </div>

                {/* How to improve section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ArrowUpCircle className="w-5 h-5 text-[#1e81b0]" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      Next Steps for Improvement
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {data.actions.map((action, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full 
                                      bg-blue-50 text-[#1e81b0] flex items-center justify-center mr-3 mt-0.5
                                      group-hover:bg-[#1e81b0] group-hover:text-white transition-all duration-200">
                          {index + 1}
                        </div>
                        <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                          {action}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;