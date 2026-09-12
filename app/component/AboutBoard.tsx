import React from 'react';
import { Link } from 'react-router';

const AboutBoard: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[360px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-16"
      style={{ backgroundImage: "url('/about.jpg')" }}
    >
      {/* Semi-transparent dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Glassmorphism Container Box */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-10 max-w-4xl border border-white/20 shadow-xl">
        
        {/* Breadcrumb Navigation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 text-white text-xs md:text-sm font-medium mb-5 bg-white/10">
          <Link to="/" className="hover:underline transition-all">
            Home
          </Link>
          <span className="text-white/70">&gt;</span>
          <span className="text-white">About Us</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
          Securing Your Future With Confidence
        </h1>

        {/* Subtitle Description */}
        <p className="text-white/90 text-sm md:text-base font-normal leading-relaxed max-w-3xl">
          Driven by a vision of trust and reliability, we aim not just to sell policies, but to build lasting relationships with our clients—supporting you through every stage of life.
        </p>

      </div>
    </div>
  );
};

export default AboutBoard;