import React, { useState } from "react";
import { Link } from "react-router";
import { Play, X } from "lucide-react";

const Hero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Replace this with the official company video URL when available.
  const videoUrl = "";

  return (
    <>
      <section className="relative flex min-h-[550px] w-full items-center overflow-hidden bg-gray-900 lg:min-h-[650px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Purabi General Insurance background"
            className="h-full w-full object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-2xl space-y-6 text-white">
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-white/70" />

              <span className="text-sm font-medium tracking-wide text-gray-200 md:text-base">
                Protecting Value Through Innovation
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Leading Insurance Solutions for Your Peace of Mind
            </h1>

            {/* Description */}
            <p className="max-w-xl text-sm font-light leading-relaxed text-gray-300 md:text-base">
              Purabi General Insurance Company Limited (PGICL) provides
              insurance solutions to help individuals and businesses protect
              against unexpected risks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              {/* Discover More */}
              <Link
                to="/about"
                className="rounded bg-[#A03822] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#852e1b] sm:text-sm"
              >
                Discover More
              </Link>

              {/* Watch Video */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 transition-all group-hover:scale-105 group-hover:border-white">
                  <Play size={14} className="ml-0.5 fill-white" />
                </div>

                <span className="transition-colors group-hover:text-gray-200">
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video modal"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="pr-10 text-xl font-bold text-gray-900 sm:text-2xl">
              Purabi General Insurance
            </h2>

            {videoUrl ? (
              <div className="mt-6 aspect-video overflow-hidden rounded-xl bg-black">
                <iframe
                  src={videoUrl}
                  title="Purabi General Insurance company video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="mt-6 flex aspect-video flex-col items-center justify-center rounded-xl bg-[#FAF3F0] px-6 text-center">
                <Play size={44} className="text-[#A03822]" />

                <p className="mt-4 text-lg font-semibold text-gray-900">
                  Company Video
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                  The official company video has not been added yet. Add the
                  video URL to enable playback.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="mt-6 rounded-lg bg-[#A03822] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#852e1b]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;