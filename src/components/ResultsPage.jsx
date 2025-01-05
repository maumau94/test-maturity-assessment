import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BarChart, ArrowUpCircle, CheckCircle, FileText, Calendar, Phone, Download } from 'lucide-react';

const ResultsPage = ({ assessmentResults }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

    const { categoryScores, overallScore } = assessmentResults;

    const processedResults = {
      overallScore: overallScore,
      categories: {}
    };

    Object.entries(categoryScores).forEach(([category, data]) => {
      processedResults.categories[category] = {
        score: data.score,
        actions: getRecommendations(category, data.score)
      };
    });

    return processedResults;
  };

  const results = calculateResults() || {
    overallScore: 0,
    categories: {
      'Quality Awareness': { score: 0, actions: [] },
      'QA & Testing': { score: 0, actions: [] },
      'Infrastructuur': { score: 0, actions: [] }
    }
  };

  const getMaturityLevel = (score) => {
    if (score >= 70) return { 
      text: 'Gevorderd', 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50' 
    };
    if (score >= 50) return { 
      text: 'Gemiddeld', 
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-700',
      bgLight: 'bg-yellow-50'
    };
    return { 
      text: 'Basis', 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50'
    };
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simuleer download vertraging
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDownloading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
            Assessment resultaat
          </h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Testvolwassenheidsscore</h2>
              <p className="text-gray-500 mt-1">Gebaseerd op de antwoorden uit het assessment</p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center gap-4"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
                {results.overallScore}%
              </div>
              <span className={`px-4 py-2 text-sm font-medium text-white rounded-full ${getMaturityLevel(results.overallScore).color}`}>
                {getMaturityLevel(results.overallScore).text}
              </span>
            </motion.div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${results.overallScore}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className={`h-full rounded-full ${getMaturityLevel(results.overallScore).color}`}
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Call to Actions */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent mb-2">
                  Start de reis naar continuous testing
                </h2>
                <p className="text-gray-500">Ontvang persoonlijke begeleiding voor het verhogen van uw testvolwassenheid</p>
              </div>

              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-[#1e81b0] to-blue-600 
                           text-white rounded-xl hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                >
                  {isDownloading ? (
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-white/20"
                    />
                  ) : null}
                  <Download className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{isDownloading ? 'Downloading...' : 'Download Volledig Rapport'}</div>
                    <div className="text-sm opacity-90">Gedetailleerde analyse en aanbevelingen</div>
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                           text-[#1e81b0] rounded-xl hover:shadow-md transition-all duration-200 border border-blue-200"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Plan een consult in</div>
                    <div className="text-sm opacity-90">Boek een sessie met een test-expert</div>
                  </div>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 
                           text-[#1e81b0] rounded-xl hover:shadow-md transition-all duration-200 border border-blue-200"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Contact Ons Team</div>
                    <div className="text-sm opacity-90">Krijg antwoord op uw vragen</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Category Results */}
          <div className="md:col-span-8 space-y-6">
            {Object.entries(results.categories).map(([category, data], index) => (
              <motion.div
                key={category}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 
                         transform transition-all duration-200 hover:shadow-xl cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMaturityLevel(data.score).color} text-white`}>
                        {getMaturityLevel(data.score).text}
                      </span>
                    </div>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="text-3xl font-bold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent"
                  >
                    {data.score}%
                  </motion.div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${data.score}%` }}
                    transition={{ duration: 1, delay: 0.7 + (index * 0.1) }}
                    className={`h-full rounded-full ${getMaturityLevel(data.score).color}`}
                  />
                </div>

                <AnimatePresence>
                  {expandedCategory === category && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowUpCircle className="w-5 h-5 text-[#1e81b0]" />
                        <h4 className="text-lg font-semibold text-gray-900">
                          Volgende stappen voor een hogere testvolwassenheid
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {data.actions.map((action, index) => (
                          <motion.li 
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start group"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full 
                                          bg-blue-50 text-[#1e81b0] flex items-center justify-center mr-3 mt-0.5
                                          group-hover:bg-[#1e81b0] group-hover:text-white transition-all duration-200">
                              {index + 1}
                            </div>
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                              {action}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;