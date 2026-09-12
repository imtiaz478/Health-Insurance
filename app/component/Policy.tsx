import React, { useState } from 'react';
import { Award, Banknote, Timer, Play, X } from 'lucide-react';

const Policy: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      id: 1,
      title: "100% Safe Money",
      description: "Your money is 100% secure with us, ensuring peace of mind.",
      icon: Award,
    },
    {
      id: 2,
      title: "Anytime Money Back",
      description: "Access your money anytime with Anytime Money Back for maximum convenience.",
      icon: Banknote,
    },
    {
      id: 3,
      title: "Fast Process",
      description: "Experience a Fast Process with quick and efficient solutions tailored to your needs.",
      icon: Timer,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Red Icon Box */}
                  <div className="w-16 h-16 bg-[#A03822] rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#A03822] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side Section Heading & Video Thumbnail */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#A03822]"></span>
              <span className="text-[#A03822] text-xs font-bold tracking-widest uppercase">
                WHY CHOOSE US
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Why You Should Choose Our Insurance Policy's
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8">
              Choose our insurance policy for comprehensive coverage, reliable protection, hassle-free claims, and a customer-focused experience.
            </p>

            {/* Video Banner with Play Button */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg group border border-gray-100">
              <img
                src="/family-video-thumb.jpg"
                alt="Family Insurance Video Thumbnail"
                className="w-full h-[260px] sm:h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

              {/* Play Button Icon Overlay */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#A03822] hover:scale-110 hover:bg-white/60 transition-all shadow-xl cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Play className="w-6 h-6 fill-[#A03822] text-[#A03822] ml-1" />
                </div>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Video Modal Popup (Optional) */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Insurance Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Policy;