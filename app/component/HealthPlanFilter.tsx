import React, { useState } from 'react';
import { User, Users, Home, HeartHandshake, ChevronDown, ArrowUpRight } from 'lucide-react';

const HealthPlanFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('self');
  const [selectedCoverage, setSelectedCoverage] = useState('all');
  const [agreed, setAgreed] = useState(false);

  const categories = [
    { id: 'self', label: 'For Self', icon: User },
    { id: 'couple', label: 'For Couple', icon: Users },
    { id: 'family', label: 'For Family', icon: Home },
    { id: 'parents', label: 'For Parents', icon: HeartHandshake },
  ];

  const coverages = [
    { id: 'all', label: 'Show all plan' },
    { id: '1lac', label: 'Up to 1 lac' },
    { id: '1to5', label: '1 Lac to 5 Lac' },
    { id: '5to10', label: '5 lac to 10 lac' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-6 md:p-12 bg-white min-h-screen">
      
      {/* Left Side Illustration */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img 
          src="/man-ins.png" 
          alt="Insurance Illustration" 
          className="max-w-full h-auto object-contain max-h-[480px]"
        />
      </div>

      {/* Right Side Form Card */}
      <div className="w-full lg:w-[520px] bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
        
        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#B03A2E] text-white shadow-md'
                      : 'bg-[#FDEDEC] text-[#B03A2E] hover:bg-[#FADBD8]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? 'text-[#B03A2E]' : 'text-gray-400'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Fields (Name & Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="w-full bg-[#F4F5F7] text-xs text-gray-700 px-4 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-[#B03A2E] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="w-full bg-[#F4F5F7] text-xs text-gray-700 px-4 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-[#B03A2E] outline-none"
            />
          </div>
        </div>

        {/* Age Dropdown */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Your Age</label>
          <div className="relative">
            <select
              className="w-full bg-[#F4F5F7] text-xs text-gray-700 px-4 py-3.5 rounded-xl appearance-none border-none focus:ring-2 focus:ring-[#B03A2E] outline-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled hidden>Select</option>
              <option value="18-25">18 - 25 Years</option>
              <option value="26-35">26 - 35 Years</option>
              <option value="36-50">36 - 50 Years</option>
              <option value="50+">50+ Years</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Health Coverage Amount */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-400 mb-2">Health Coverage Amount (৳)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {coverages.map((cov) => {
              const isActive = selectedCoverage === cov.id;
              return (
                <button
                  key={cov.id}
                  type="button"
                  onClick={() => setSelectedCoverage(cov.id)}
                  className={`py-3 px-2 text-xs font-medium rounded-xl text-center border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FADBD8] text-[#B03A2E] border-[#FADBD8]'
                      : 'bg-[#F4F5F7] text-gray-700 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {cov.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-[#B03A2E] accent-[#B03A2E] rounded border-gray-300 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer">
            I agree with the <span className="font-bold text-[#B03A2E] underline">Terms of Service</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-[#B03A2E] hover:bg-[#922B21] text-white text-sm font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <span>See Plans</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default HealthPlanFilter;