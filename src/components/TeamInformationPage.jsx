import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TeamInformationPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    numberOfTesters: '',
    methodology: '',
    automationTools: [],
    sapProducts: [], 
    customApplications: [],
  });

  const methodologies = ['Onbekend','Agile', 'Waterval', 'Hybride'];
  const automationTools = ['Tosca', 'Selenium', 'Worksoft', 'UFT', 'Cucumber', 'Jenkins'];
  const sapProducts = ['SAP Fiori', 'SAP ECC', 'SAP S4/HANA', 'SuccessFactors'];
  const customApps = ['Web Services/API', 'PDF Bestanden', 'Mainframe Applicaties', 'Mobiele Applicaties'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddOption = (field, value) => {
    if (value && !formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    }
  };

  const handleRemoveOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Main Content */}
      <main className="flex-grow flex justify-center px-4 py-12">
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="max-w-3xl w-full"
        >
          <div className="bg-gradient-to-br from-[#1e73ac] to-[#1e81b0] rounded-2xl shadow-xl p-8 md:p-12">
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Team Informatie</h2>
              <p className="text-gray-100 mt-3 text-lg">Vertel ons wat meer over het testteam en de testomgeving</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Fields */}
              {[
                {
                  label: "Naam van het team",
                  type: "text",
                  value: formData.teamName,
                  onChange: (e) => setFormData({ ...formData, teamName: e.target.value }),
                  placeholder: "Vul team naam in"
                },
                {
                  label: "Het aantal testers in het team",
                  type: "number",
                  value: formData.numberOfTesters,
                  onChange: (e) => setFormData({ ...formData, numberOfTesters: e.target.value }),
                  placeholder: "Aantal",
                  min: "1"
                }
              ].map((field, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <label className="block text-lg font-medium text-white mb-3">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    className="block w-full px-4 py-3 bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-transparent 
                             rounded-xl shadow-lg focus:ring-4 focus:ring-blue-200 focus:border-white 
                             transition-all duration-200 text-lg group-hover:shadow-xl"
                    placeholder={field.placeholder}
                    min={field.min}
                  />
                </motion.div>
              ))}

              {/* Methodology Dropdown */}
              <motion.div whileHover={{ scale: 1.01 }} className="group">
                <label className="block text-lg font-medium text-white mb-3">Welke ontwikkelmethodiek gebruiken jullie?</label>
                <select
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  className="block w-full px-4 py-3 bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-transparent 
                           rounded-xl shadow-lg focus:ring-4 focus:ring-blue-200 focus:border-white 
                           transition-all duration-200 text-lg group-hover:shadow-xl"
                >
                  <option value="">Kies methodiek</option>
                  {methodologies.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </motion.div>

              {/* Multi-select sections */}
              {[
                {
                  label: "Welke testautomation tools gebruiken jullie?",
                  field: "automationTools",
                  options: automationTools
                },
                {
                  label: "Welke SAP-producten testen jullie?",
                  field: "sapProducts",
                  options: sapProducts
                },
                {
                  label: "Welke custom applicaties test het team?",
                  field: "customApplications",
                  options: customApps
                }
              ].map((section, index) => (
                <motion.div key={index} whileHover={{ scale: 1.01 }} className="group">
                  <label className="block text-lg font-medium text-white mb-3">{section.label}</label>
                  <select
                    onChange={(e) => handleAddOption(section.field, e.target.value)}
                    className="block w-full px-4 py-3 bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-transparent 
                             rounded-xl shadow-lg focus:ring-4 focus:ring-blue-200 focus:border-white 
                             transition-all duration-200 text-lg group-hover:shadow-xl"
                  >
                    <option value="">Maak een keuze</option>
                    {section.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <AnimatePresence>
                      {formData[section.field].map((item) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                          className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl text-sm 
                                   flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                          {item}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleRemoveOption(section.field, item)}
                            className="p-1 hover:bg-red-500 hover:text-white rounded-full transition-colors duration-200"
                          >
                            <X size={16} />
                          </motion.button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#fc4a32' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-8 bg-white text-gray-800 py-4 px-8 rounded-xl text-xl font-semibold
                         shadow-lg hover:shadow-xl hover:text-white transition-all duration-300"
              >
                Ga door naar het assessment
              </motion.button>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/80 backdrop-blur-sm py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Sogeti, Part of Capgemini</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default TeamInformationPage;
