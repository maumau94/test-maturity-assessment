import React from 'react';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onStartClick, onLoginClick }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          {/* Logo */}
          <div className="flex items-center justify-start ml-4">
            <div className="text-2xl font-bold text-gray-800">Sogeti Test Assessment</div>
          </div>

          {/* Navbar Items */}
          <div className="flex-1 flex justify-center space-x-8">
            <a href="#" className="text-gray-800 hover:text-blue-600 transition-all duration-200">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition-all duration-200">
              Services
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition-all duration-200">
              Cases
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition-all duration-200">
              Contact
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="bg-[#1f74ac] text-white px-4 py-2 border border-[#1e73ac] rounded-lg hover:bg-[#fc4a32] hover:border-[#fc4a32] transition-all duration-200 ml-auto"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">SAP Test Maturity Assessment</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover your organization's testing maturity level and get a personalized roadmap towards continuous testing excellence in your SAP environment.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {['Assess', 'Analyze', 'Advance'].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1f74ac] text-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              >
                <div className="font-bold text-2xl mb-4">{feature}</div>
                <p className="text-lg">
                  {feature === 'Assess'
                    ? 'Evaluate your current testing practices, tools, and methodologies against industry standards.'
                    : feature === 'Analyze'
                    ? 'Get detailed insights into your strengths and areas for improvement in SAP testing.'
                    : 'Receive a customized roadmap to enhance your testing capabilities and achieve continuous testing.'}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button
              onClick={onStartClick}
              className="bg-[#1f74ac] text-white px-8 py-4 border border-[#1e73ac] rounded-lg text-lg font-medium hover:bg-[#fc4a32] hover:border-[#fc4a32] hover:shadow-lg inline-flex items-center transition-all duration-300"
            >
              Start Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Sogeti, Part of Capgemini</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
