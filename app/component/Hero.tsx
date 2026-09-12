import React from "react";
import { Play } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center bg-gray-900 overflow-hidden">
      {/* Background Image using standard HTML img tag */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg" // public/assets/hero.jpg থেকে ইমেজ পাবে
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl text-white space-y-6">
          
          {/* Tagline */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-white/70" />
            <span className="text-sm md:text-base font-medium tracking-wide text-gray-200">
              Protecting Value Through Innovation
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Leading Insurance Solutions for Your Peace of Mind
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-light">
            Purabi General Insurance Company Limited (PGICL), established in 1988, 
            is a leading insurer in Bangladesh, providing comprehensive asset protection 
            for corporate organizations.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            {/* Discover More Button */}
            <a
              href="#"
              className="bg-[#A03822] hover:bg-[#852e1b] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase px-8 py-4 rounded transition-all duration-200 shadow-md"
            >
              Discover More
            </a>

            {/* Watch Video Button */}
            <button
              onClick={() => {}}
              className="flex items-center gap-3 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-105 group-hover:border-white transition-all">
                <Play size={14} className="fill-white ml-0.5" />
              </div>
              <span className="group-hover:text-gray-200 transition-colors">
                Watch Video
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;