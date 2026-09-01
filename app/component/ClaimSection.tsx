import React from "react";
import { ArrowUpRight } from "lucide-react";

const ClaimSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* Left Side: Family Image with Circular Backdrop */}
        <div className="relative w-full max-w-md flex justify-center items-center">
          {/* Subtle Pink/Beige Decorative Background Circles */}
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-[#FAF3F0] rounded-full -z-10 scale-110" />
          <div className="absolute w-60 h-60 sm:w-64 sm:h-64 bg-[#F5E6E0] rounded-full -z-10" />
          
          {/* Main Image */}
          <img
            src="/assets/family.png" // public/assets/family.png পাথ ব্যবহার করুন
            alt="Happy Family"
            className="w-full h-auto object-contain relative z-10"
          />
        </div>

        {/* Right Side: Content Box */}
        <div className="w-full max-w-2xl bg-[#FAF3F0] border border-[#F3E5E0] rounded-3xl p-8 sm:p-12 space-y-6">
          
          {/* Subheading */}
          <span className="text-xs sm:text-sm font-bold tracking-wider text-gray-700 uppercase">
            BE HAPPY TO GET INSURANCE
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Start Tracking Your Claims
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
            Enjoy peace of mind with hassle-free insurance. Track your claims effortlessly and stay informed every step of the way.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            {/* CTA Button */}
            <a
              href="#"
              className="bg-[#A03822] hover:bg-[#852e1b] text-white font-semibold text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Claim Coverage</span>
              <ArrowUpRight size={18} />
            </a>

            {/* Separator OR */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="w-6 h-[1px] bg-gray-300" />
              <span>OR</span>
              <span className="w-6 h-[1px] bg-gray-300" />
            </div>

            {/* Mail Contact */}
            <div className="text-xs sm:text-sm text-gray-600">
              <span>Mail Us Anytime: </span>
              <a
                href="mailto:purabiinsurance@gmail.com"
                className="font-bold text-gray-900 hover:text-[#A03822] transition-colors"
              >
                purabiinsurance@gmail.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ClaimSection;