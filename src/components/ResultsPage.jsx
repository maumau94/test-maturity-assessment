import React from 'react';
import { ChevronRight, BarChart, ArrowUpCircle, CheckCircle, FileText, Calendar, Phone, Download } from 'lucide-react';

const ResultsPage = ({ assessmentResults }) => {
  // Definiëren van mogelijke acties per categorie en volwassenheidsniveau
  const recommendationsByCategory = {
    'Quality Awareness': {
      low: [
        'Begin met het documenteren van testprocessen',
        'Definieer basis test rollen en verantwoordelijkheden',
        'Start met regelmatige test review meetings',
        'Implementeer basis kwaliteitscontroles'
      ],
      medium: [
        'Verbeter rol-gebaseerde verantwoordelijkheden',
        'Implementeer gestructureerde impact analyse',
        'Versterk kennisdeling tussen teams',
        'Ontwikkel KPIs voor testkwaliteit'
      ],
      high: [
        'Optimaliseer bestaande quality processen',
        'Automatiseer impact analyse volledig',
        'Implementeer AI-gedreven kwaliteitscontroles',
        'Ontwikkel predictieve kwaliteitsmetrieken'
      ]
    },
    'QA & Testing': {
      low: [
        'Start met het maken van een test strategie',
        'Implementeer basis test scenarios',
        'Begin met test data management',
        'Documenteer test resultaten structureel'
      ],
      medium: [
        'Verbeter test coverage met risk-based testing',
        'Implementeer test automatisering voor key scenarios',
        'Ontwikkel een test data strategie',
        'Integreer security testing'
      ],
      high: [
        'Implementeer AI-gedreven test generatie',
        'Optimaliseer test automatisering',
        'Ontwikkel predictive testing capabilities',
        'Maximaliseer test coverage'
      ]
    },
    'Infrastructuur': {
      low: [
        'Vaststellen van de benodigde testtools in de testomgeving',
        'Implementeer eerste automated tests',
        'Start met test omgeving management',
        'Ontwikkel deployment procedures'
      ],
      medium: [
        'Verbeter CI/CD pipeline efficiëntie',
        'Automatiseer regressie testen',
        'Implementeer test omgeving automatisering',
        'Verkort feedback loops'
      ],
      high: [
        'Optimaliseer CI/CD voor maximale snelheid',
        'Implementeer zero-touch testing',
        'Automatiseer infrastructure-as-code',
        'Ontwikkel self-healing test environments'
      ]
    }
  };

  // Helper functie om niveau te bepalen op basis van score
  const getRecommendations = (category, score) => {
    if (score <= 50) return recommendationsByCategory[category].low;
    if (score < 70) return recommendationsByCategory[category].medium;
    return recommendationsByCategory[category].high;
  };

  // Calculatie van scores per categorie
  const calculateResults = () => {
    if (!assessmentResults) return null;

    // Haal categorieScores uit de assessment resultaten
    const { categoryScores, overallScore } = assessmentResults;

    // Verwerk de scores en voeg aanbevelingen toe
    const processedResults = {
      overallScore: overallScore,
      categories: {}
    };

    // Verwerk elke categorie
    Object.entries(categoryScores).forEach(([category, data]) => {
      processedResults.categories[category] = {
        score: data.score,
        actions: getRecommendations(category, data.score)
      };
    });

    return processedResults;
  };

  // Bereken de resultaten
  const results = calculateResults() || {
    overallScore: 0,
    categories: {
      'Quality Awareness': { score: 0, actions: [] },
      'QA & Testing': { score: 0, actions: [] },
      'Infrastructuur': { score: 0, actions: [] }
    }
  };

  // Helper functie om het volwassenheidsniveau te bepalen
  const getMaturityLevel = (score) => {
    if (score >= 70) return { 
      text: 'Advanced', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50' 
    };
    if (score >= 55) return { 
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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
            Assessment resultaat
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Testvolwassenheidsscore</h2>
              <p className="text-gray-500 mt-1">Gebaseerd op de antwoorden uit het assessment</p>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent mb-2">
                  Start de reis naar continuous testing
                </h2>
                <p className="text-gray-500">Ontvang persoonlijke begeleiding voor het verhogen van uw testvolwassenheid</p>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center p-4 bg-gradient-to-r from-[#1e81b0] to-blue-600 
                                text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] 
                                transition-all duration-200">
                  <Download className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Download Volledig Rapport</div>
                    <div className="text-sm opacity-90">Gedetailleerde analyse en aanbevelingen</div>
                  </div>
                </button>

                <button className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                                text-[#1e81b0] rounded-xl hover:shadow-md transform hover:scale-[1.02] 
                                transition-all duration-200 border border-blue-200">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Plan een consult in</div>
                    <div className="text-sm opacity-90">Boek een sessie met een test-expert</div>
                  </div>
                </button>

                <button className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                                text-[#1e81b0] rounded-xl hover:shadow-md transform hover:scale-[1.02] 
                                transition-all duration-200 border border-blue-200">
                  <Phone className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Contact Ons Team</div>
                    <div className="text-sm opacity-90">Krijg antwoord op uw vragen</div>
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

                {/* Aanbevelingen sectie */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ArrowUpCircle className="w-5 h-5 text-[#1e81b0]" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      Volgende stappen voor een hogere testvolwassenheid
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