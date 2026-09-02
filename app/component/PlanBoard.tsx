import React from 'react';

const PlanBoard: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[320px] bg-cover bg-center flex items-center px-6 md:px-16"
      style={{ backgroundImage: "url('/plan.jpg')" }}
    >
      {/* Overlay Card with Blur Effect */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-10 max-w-3xl border border-white/30 shadow-lg">
        
        {/* Breadcrumb Button */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/40 text-white text-xs md:text-sm font-medium mb-5 bg-white/10">
          <span>Home</span>
          <span>&gt;</span>
          <span>Health Insurance</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-normal text-white leading-tight">
          Choose The Best <span className="font-bold">Health Insurance</span> Plan For Yourself And Your Family
        </h1>

      </div>
    </div>
  );
};

export default PlanBoard;