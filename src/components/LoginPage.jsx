import React from 'react';
import { UserCircle, Lock } from 'lucide-react';
import { AiOutlineGoogle, AiFillGithub } from 'react-icons/ai';

const LoginPage = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="max-w-md w-full p-8 rounded-xl shadow-xl"
        style={{
          backgroundColor: '#1e73ac',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-white mt-2">Sign in to start your assessment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
  <label className="block text-sm font-medium text-white mb-2">Email Address</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <UserCircle className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="email"
      className="block w-full pl-10 pr-3 py-3 bg-white text-black border-gray-300 rounded-xl 
                 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter your email"
    />
  </div>
</div>

<div>
  <label className="block text-sm font-medium text-white mb-2">Password</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Lock className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="password"
      className="block w-full pl-10 pr-3 py-3 bg-white text-black border-gray-300 rounded-xl 
                 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter your password"
    />
  </div>
</div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-3 px-4 rounded-xl font-medium 
                       hover:bg-[#fc4a32] hover:text-white border border-transparent
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fc4a32]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-6 flex items-center">
          <div className="flex-grow border-t border-white/50"></div>
          <div className="mx-4 text-sm text-white">or continue with</div>
          <div className="flex-grow border-t border-white/50"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
  <button
    className="flex items-center justify-center px-4 py-3 bg-white border border-[#1f74ac] 
               rounded-xl hover:border-[#1f74ac] hover:shadow-lg transition-all duration-200"
  >
    <AiOutlineGoogle className="w-5 h-5 text-gray-500 mr-2" />
    <span className="text-black font-medium">Google</span>
  </button>
  <button
    className="flex items-center justify-center px-4 py-3 bg-white border border-[#1f74ac] 
               rounded-xl hover:border-[#1f74ac] hover:shadow-lg transition-all duration-200"
  >
    <AiFillGithub className="w-5 h-5 text-gray-500 mr-2" />
    <span className="text-black font-medium">GitHub</span>
  </button>
</div>

        {/* Help Text */}
        <p className="mt-6 text-center text-sm text-white">
          Need help?{' '}
          <a
            href="#"
            className="font-medium text-white underline hover:text-gray-200 transition-colors duration-200"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
