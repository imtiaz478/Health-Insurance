import React from 'react';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

const CompanyOverview: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Grid Layout with Overlapping Cards */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 relative">
              
              {/* Main Family Image */}
              <div className="col-span-8 relative">
                <img
                  src="/about-family.jpg"
                  alt="Happy Family"
                  className="rounded-3xl w-full h-[320px] sm:h-[380px] object-cover shadow-sm"
                />
              </div>

              {/* Years of Experience Badge */}
              <div className="absolute top-12 left-[55%] z-10 bg-[#A03822] text-white p-6 rounded-3xl text-center shadow-xl w-36 sm:w-40 border-4 border-white">
                <h3 className="text-3xl sm:text-4xl font-extrabold">27+</h3>
                <p className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase mt-1 leading-tight">
                  Years of Experience
                </p>
              </div>

              {/* Bottom Right Umbrella/House Image */}
              <div className="col-span-7 col-start-6 mt-4">
                <img
                  src="/about-house.jpg"
                  alt="House Insurance Model"
                  className="rounded-3xl w-full h-[220px] object-cover shadow-sm"
                />
              </div>

              {/* Satisfied Clients Overlay Card */}
              <div className="absolute bottom-4 left-0 sm:left-4 z-10 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <img
                  src="/about-user.jpg"
                  alt="Satisfied Client"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 leading-none">1000k+</h4>
                  <p className="text-[10px] sm:text-xs font-bold text-[#A03822] uppercase mt-1 tracking-wide">
                    Satisfied Clients
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#A03822]"></span>
              <span className="text-[#A03822] text-xs font-bold tracking-widest uppercase">
                About Us
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              We’re Providing Best Insurance Policy’s
            </h2>

            {/* Description Text */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Purabi General Insurance Company Limited (PGICL), <span className="font-bold text-gray-800">established on June 29, 1998</span>, is a leading insurer in Bangladesh, providing comprehensive general insurance services. Licensed under the Insurance Act, 1938, PGICL offers a wide range of protection beyond life insurance, ensuring your peace of mind with reliable and innovative solutions.
            </p>

            {/* Bottom Highlight Feature Box */}
            <div className="bg-[#F8F9FA] p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              
              {/* Success Rate Widget */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                <div className="w-14 h-14 bg-[#A03822] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-3xl font-black text-gray-900 block leading-none">90%</span>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </span>
                </div>
              </div>

              {/* Bullet Points List */}
              <div className="space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 text-gray-600 font-medium text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#A03822] flex-shrink-0" />
                  <span>Comprehensive Coverage</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 font-medium text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#A03822] flex-shrink-0" />
                  <span>Customer-Centric Approach</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 font-medium text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#A03822] flex-shrink-0" />
                  <span>Commitment to Excellence</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;