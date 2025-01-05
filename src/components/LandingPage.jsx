import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStartClick, onLoginClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const featureCards = [
    {
      title: 'Inzicht',
      description: 'Krijg direct inzicht in het testvolwassenheidsniveau van jouw team.',
      icon: '📊'
    },
    {
      title: 'Aanbevelingen',
      description: 'Ontvang praktische verbeterpunten om jouw testproces naar een hoger niveau te tillen.',
      icon: '💡'
    },
    {
      title: 'Ondersteuning',
      description: 'Laat je begeleiden door de experts van Sogeti en ontvang op maat gemaakte ondersteuning.',
      icon: '🤝'
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Animated Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center justify-start ml-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#1f74ac] to-blue-600 bg-clip-text text-transparent">
              Sogeti
            </div>
          </div>

          <div className="flex-1 flex justify-center space-x-8">
            {['Home', 'Services', 'Cases', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-gray-800 hover:text-[#1f74ac] transition-all duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1f74ac] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          <button
            onClick={onLoginClick}
            className="bg-[#1f74ac] text-white px-6 py-2 rounded-lg hover:bg-[#fc4a32] 
                     transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow w-full"
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#1f74ac] to-blue-600 bg-clip-text text-transparent">
              Sogeti's Test Maturity Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ontdek het testvolwassenheidsniveau van jouw organisatie en versnel het pad naar continuous testing in jouw SAP-omgeving.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100
                         hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#1f74ac]">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartClick}
              className="bg-gradient-to-r from-[#1f74ac] to-blue-600 text-white px-8 py-4 rounded-xl
                       text-lg font-medium inline-flex items-center gap-2 shadow-lg hover:shadow-xl
                       hover:from-[#fc4a32] hover:to-[#fc4a32] transition-all duration-300"
            >
              Start Assessment
              <ArrowRight className="animate-bounce" />
            </motion.button>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full bg-white/80 backdrop-blur-sm py-6 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Sogeti, Part of Capgemini</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;