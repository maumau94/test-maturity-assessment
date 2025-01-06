import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionsPage = ({ onSubmit }) => {
  const questions = [
    {
      category: "Quality Awareness",
      questions: [
        {
          id: 1,
          text: "Welke rollen zijn verantwoordelijk voor de kwaliteit van jouw SAP business processen?",
          tooltip: "Het betrekken van verschillende rollen bij kwaliteitsborging is essentieel voor een complete testdekking. Een gevorderde aanpak vereist samenwerking tussen business, techniek en architectuur.",
          options: [
            { text: "Business Expert", score: 1 },
            { text: "Automation Engineer", score: 2 },
            { text: "Test Architect", score: 3 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: true
        },
        {
          id: 2,
          text: "Wie is verantwoordelijk voor het opstellen van de teststrategie binnen het project?",
          tooltip: "Een effectieve teststrategie vereist input van verschillende stakeholders. Een centrale of ad-hoc aanpak duidt vaak op een lager volwassenheidsniveau.",
          options: [
            { text: "Weet ik niet", score: 0 },
            { text: "Ad-hoc door teamleden tijdens het project", score: 1 },
            { text: "Test Manager", score: 2 },
            { text: "Cross-functioneel team die samen ernaar kijken", score: 3 }
          ],
          multiSelect: false
        },
        {
          id: 3,
          text: "Hoe wordt de impact van een change bepaald in een SAP-omgeving?",
          tooltip: "De manier waarop impact analyse wordt uitgevoerd is een belangrijke indicator voor testvolwassenheid. Geautomatiseerde tools duiden op een hoger niveau van proces-optimalisatie.",
          options: [
            { text: "Op gevoel", score: 1 },
            { text: "Geautomatiseerd met behulp van tools", score: 3 },
            { text: "Door anderen", score: 1 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: false
        }
      ]
    },
    {
      category: "QA & Testing",
      questions: [
        {
          id: 4,
          text: "Hoe benaderen jullie het maken van testen en het test design?",
          tooltip: "Een methodische aanpak van testontwerp zorgt voor betere kwaliteit en herbruikbaarheid van tests. Geautomatiseerde analyse duidt op hoogste volwassenheidsniveau.",
          options: [
            { text: "Op gevoel", score: 1 },
            { text: "Wordt gemaakt door anderen", score: 1 },
            { text: "Methodische benadering", score: 2 },
            { text: "Door een geautomatiseerde impact analyse", score: 3 }
          ],
          multiSelect: false
        },
        {
          id: 5,
          text: "Hoe bepalen jullie de test dekking van een test suite?",
          tooltip: "De manier van het meten van testdekking geeft inzicht in hoe grondig het testproces is ingericht. Risk-based testing is een indicator van volwassen testprocessen.",
          options: [
            { text: "Aantal test cases", score: 1 },
            { text: "Business Risk Coverage", score: 3 },
            { text: "Requirements coverage", score: 2 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: false
        },
        {
          id: 6,
          text: "Hoeveel procent van jullie SAP business processen zijn gedekt door een test suite?",
          tooltip: "Het percentage testdekking is een directe indicator van de volwassenheid van het testproces. Hogere dekking betekent meestal betere kwaliteitsborging.",
          options: [
            { text: "Minder dan 25%", score: 1 },
            { text: "Tussen de 25% en 50%", score: 2 },
            { text: "Tussen 50%-75%", score: 3 },
            { text: "Boven de 75%", score: 3 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: false
        }
      ]
    },
    {
      category: "Infrastructuur",
      questions: [
        {
          id: 7,
          text: "Welke type testen worden uitgevoerd om de kwaliteit van de business processen te valideren?",
          tooltip: "Een mix van verschillende testtypen is belangrijk voor goede kwaliteitsborging. End-to-end en regressietesten zijn vooral belangrijk voor SAP-processen.",
          options: [
            { text: "Integratie testen", score: 2 },
            { text: "End-to-end testen", score: 3 },
            { text: "Regressie testen", score: 3 },
            { text: "Unit testen", score: 3 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: true
        },
        {
          id: 8,
          text: "Hoe vaak worden (geautomatiseerde) testen gedraaid?",
          tooltip: "De frequentie van testen is een belangrijke indicator voor continuous testing volwassenheid. Frequenter testen betekent snellere feedback en betere kwaliteit.",
          options: [
            { text: "Na elke build", score: 1 },
            { text: "Één keer per release cycle", score: 1 },
            { text: "Wekelijks", score: 2 },
            { text: "Dagelijks", score: 3 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: false
        },
        {
          id: 9,
          text: "Hoelang duurt het om te rapporteren over de kwaliteit van een applicatie of systeem?",
          tooltip: "De snelheid van kwaliteitsrapportage is cruciaal voor continuous testing. Real-time inzicht duidt op een hoogontwikkeld testproces.",
          options: [
            { text: "Meer dan een dag", score: 1 },
            { text: "Binnen een dag", score: 2 },
            { text: "Binnen een uur", score: 3 },
            { text: "Real-time", score: 3 },
            { text: "Weet ik niet", score: 0 }
          ],
          multiSelect: false
        },
        {
          id: 10,
          text: "Welke KPI's worden gemeten om de business impact van het testen te rapporteren?",
          tooltip: "Het meten van de juiste KPI's is belangrijk voor het aantonen van de waarde van testing. Preventieve metrieken duiden op een volwassen testaanpak.",
          options: [
            { text: "Kosten besparing", score: 1 },
            { text: "Time-to-market", score: 2 },
            { text: "Voorkomen van defecten", score: 3 }
          ],
          multiSelect: true
        }
      ]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [direction, setDirection] = useState(0);

  // Flatten questions array for easier navigation
  const flatQuestions = questions.reduce((acc, category) => [...acc, ...category.questions], []);
  const currentQuestion = flatQuestions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setAnswers((prev) => {
      if (currentQuestion.multiSelect) {
        const currentAnswers = prev[currentQuestion.id] || [];
        const updatedAnswers = currentAnswers.includes(option.text)
          ? currentAnswers.filter((a) => a !== option.text)
          : [...currentAnswers, option.text];
        
        return {
          ...prev,
          [currentQuestion.id]: updatedAnswers,
          [`${currentQuestion.id}_scores`]: updatedAnswers.map(
            answer => currentQuestion.options.find(opt => opt.text === answer).score
          )
        };
      }
      return { 
        ...prev, 
        [currentQuestion.id]: [option.text],
        [`${currentQuestion.id}_scores`]: [option.score]
      };
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < flatQuestions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveTooltip(null);
    } else {
      const categoryScores = questions.reduce((acc, category) => {
        const categoryQuestions = category.questions;
        const categoryScore = categoryQuestions.reduce((sum, question) => {
          const questionScores = answers[`${question.id}_scores`] || [];
          return sum + questionScores.reduce((scoreSum, score) => scoreSum + score, 0);
        }, 0);
        
        const maxPossibleScore = categoryQuestions.reduce((sum, question) => {
          if (question.multiSelect) {
            const topScores = question.options
              .map(opt => opt.score)
              .sort((a, b) => b - a)
              .slice(0, 3);
            return sum + topScores.reduce((scoreSum, score) => scoreSum + score, 0);
          } else {
            return sum + Math.max(...question.options.map(opt => opt.score));
          }
        }, 0);

        return {
          ...acc,
          [category.category]: {
            score: Math.round((categoryScore / maxPossibleScore) * 100),
            questions: categoryQuestions.map(question => ({
              id: question.id,
              scores: answers[`${question.id}_scores`] || []
            }))
          }
        };
      }, {});

      const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0);
      const averageScore = Math.round(totalScore / Object.keys(categoryScores).length);

      onSubmit({
        answers,
        categoryScores,
        overallScore: averageScore
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setActiveTooltip(null);
    }
  };

  const progress = ((currentQuestionIndex + 1) / flatQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#1e81b0] to-blue-600 bg-clip-text text-transparent">
            Assessment
          </h1>
          <span className="text-sm text-gray-600">
            Vraag {currentQuestionIndex + 1} van {flatQuestions.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
              {questions.find(category => 
                category.questions.some(q => q.id === currentQuestion.id)
              ).category}
            </span>
          </div>

          {/* Question with Tooltip */}
          <div className="relative mb-8">
            <div className="flex items-start gap-2">
              <h2 className="text-xl font-semibold text-gray-900 flex-grow">
                {currentQuestion.text}
              </h2>
              <div className="relative">
                <HelpCircle 
                  className="w-5 h-5 text-[#1e81b0] hover:text-blue-600 cursor-help" 
                  onClick={() => setActiveTooltip(activeTooltip === currentQuestion.id ? null : currentQuestion.id)}
                />
                
                {activeTooltip === currentQuestion.id && (
                  <div className="absolute right-0 mt-2 w-80 p-4 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                    <div className="text-sm space-y-2">
                      <div className="font-medium text-[#1e81b0]">
                        Waarom vragen we dit?
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {currentQuestion.tooltip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200
                  ${answers[currentQuestion.id]?.includes(option.text)
                    ? 'bg-gradient-to-r from-[#1e81b0] to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#1e81b0]/30'
                  }
                `}
              >
                <div className="relative z-10 flex items-center">
                  <span className="flex-grow">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress and Navigation */}
        <div className="mt-8">
          {/* Progress bar */}
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-[#1e81b0] to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200
                ${currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Terug
            </button>

            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#1e81b0] to-blue-600 
                       text-white hover:shadow-lg transform hover:scale-105 
                       active:scale-95 transition-all duration-200"
            >
              {currentQuestionIndex === flatQuestions.length - 1 ? 'Einde' : 'Volgende'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;