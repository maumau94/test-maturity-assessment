import React, { useState } from 'react';

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
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-grow flex justify-center px-4 py-12">
        <div className="max-w-3xl w-full">
          <div className="bg-[#1e73ac] rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Team Informatie</h2>
              <p className="text-gray-200 mt-2">Vertel ons wat meer over het testteam en de testomgeving</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Naam van het team</label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                  placeholder="Vul team naam in"
                />
              </div>

              {/* Number of Testers */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Het aantal testers in het team</label>
                <input
                  type="number"
                  value={formData.numberOfTesters}
                  onChange={(e) => setFormData({ ...formData, numberOfTesters: e.target.value })}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                  placeholder="Aantal"
                  min="1"
                />
              </div>

              {/* Methodology */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Welke ontwikkelmethodiek gebruiken jullie?</label>
                <select
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                >
                  <option value="">Kies methodiek</option>
                  {methodologies.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Automation Tools */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Welke testautomation tools gebruiken jullie?</label>
                <select
                  onChange={(e) => handleAddOption('automationTools', e.target.value)}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                >
                  <option value="">Kies tool(s)</option>
                  {automationTools.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap mt-2">
                  {formData.automationTools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                    >
                      {tool}
                      <button
                        type="button"
                        className="ml-2 bg-[#fc4a32] text-white px-2 py-1 rounded-full text-xs hover:bg-[#fc4a32] focus:outline-none"
                        onClick={() => handleRemoveOption('automationTools', tool)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* SAP Products */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Welke SAP-producten testen jullie?</label>
                <select
                  onChange={(e) => handleAddOption('sapProducts', e.target.value)}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                >
                  <option value="">Kies product(en)</option>
                  {sapProducts.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap mt-2">
                  {formData.sapProducts.map((product) => (
                    <span
                      key={product}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                    >
                      {product}
                      <button
                        type="button"
                        className="ml-2 bg-[#fc4a32] text-white px-2 py-1 rounded-full text-xs hover:bg-[#fc4a32] focus:outline-none"
                        onClick={() => handleRemoveOption('sapProducts', product)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Custom Applications */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Welke custom applicaties test het team?</label>
                <select
                  onChange={(e) => handleAddOption('customApplications', e.target.value)}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1e73ac] focus:border-[#1e73ac]"
                >
                  <option value="">Kies applicatie(s)</option>
                  {customApps.map((app) => (
                    <option key={app} value={app}>
                      {app}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap mt-2">
                  {formData.customApplications.map((app) => (
                    <span
                      key={app}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                    >
                      {app}
                      <button
                        type="button"
                        className="ml-2 bg-[#fc4a32] text-white px-2 py-1 rounded-full text-xs hover:bg-[#fc4a32] focus:outline-none"
                        onClick={() => handleRemoveOption('customApplications', app)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 px-8 border border-gray-300 text-lg font-medium hover:bg-[#fc4a32] hover:text-white hover:border-[#fc4a32] transition-all duration-200 focus:outline-none"
                >
                  Ga door naar het assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Sogeti, Part of Capgemini</p>
        </div>
      </footer>
    </div>
  );
};

export default TeamInformationPage;
