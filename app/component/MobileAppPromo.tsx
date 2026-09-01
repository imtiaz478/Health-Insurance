import React from 'react';

const MobileAppPromo: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-red-50/40 via-red-50/20 to-orange-50/30 border border-gray-100 shadow-sm pt-12 md:pt-16 px-6 text-center flex flex-col items-center">
          
          {/* Top Sub-tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-red-600"></span>
            <span className="text-xs uppercase tracking-widest text-red-600 font-bold">
              GET OUR MOBILE APP
            </span>
            <span className="w-6 h-[2px] bg-red-600"></span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-wide uppercase mb-4">
            EXPERIENCED OUR MOBILE APP
          </h2>

          {/* Description */}
          <p className="max-w-3xl text-xs md:text-sm text-gray-600 leading-relaxed mb-8">
            Simplify your insurance experience with our mobile app. Access your policy details, track claims, and receive instant updates anytime, anywhere.
            <br className="hidden sm:inline" /> Stay in control of your coverage with just a few taps. Download now for convenience and peace of mind!
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 z-10">
            {/* Google Play Button */}
            <a
              href="#google-play"
              className="bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-colors shadow-md"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .67.11.94.31l12.5 9.5-12.5 9.5c-.27.2-.6.31-.94.31-.83 0-1.5-.67-1.5-1.5zm1.5-16.14v15.28l10.05-7.64L4.5 4.36z"/>
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-gray-300">GET IT ON</div>
                <div className="text-sm font-bold leading-none">Google Play</div>
              </div>
            </a>

            {/* App Store Button */}
            <a
              href="#app-store"
              className="bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-colors shadow-md"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.65-.79 1.1-1.9 0.98-3-.95.04-2.1.64-2.78 1.43-.6.7-1.13 1.83-.99 2.92 1.07.08 2.14-.56 2.79-1.35z"/>
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-gray-300">Download on the</div>
                <div className="text-sm font-bold leading-none">App Store</div>
              </div>
            </a>
          </div>

          {/* Mockup Phone Frames */}
          <div className="relative w-full max-w-md h-56 sm:h-64 flex justify-center overflow-hidden">
            
            {/* Left Phone */}
            <div className="absolute -bottom-10 -left-4 sm:left-4 w-44 sm:w-52 h-80 bg-slate-900 rounded-[35px] border-4 border-slate-700 shadow-2xl transform -rotate-6 z-0 p-2">
              <div className="w-full h-full bg-white rounded-[28px] overflow-hidden flex flex-col items-center justify-center border border-gray-200 relative">
                <div className="absolute top-2 w-16 h-3 bg-black rounded-full"></div>
                <div className="w-12 h-12 border-2 border-[#B2432B] rounded-lg flex items-center justify-center text-[#B2432B] font-bold text-xl">
                  P
                </div>
              </div>
            </div>

            {/* Right Phone (Front) */}
            <div className="absolute -bottom-6 w-48 sm:w-56 h-88 bg-slate-900 rounded-[38px] border-4 border-slate-700 shadow-2xl transform rotate-3 z-10 p-2">
              <div className="w-full h-full bg-white rounded-[30px] overflow-hidden flex flex-col items-center justify-center border border-gray-200 relative">
                <div className="absolute top-2 w-16 h-3 bg-black rounded-full"></div>
                <div className="w-16 h-16 border-2 border-[#B2432B] rounded-xl flex items-center justify-center text-[#B2432B] font-extrabold text-2xl shadow-inner">
                  P
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;