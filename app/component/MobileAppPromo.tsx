
import React from "react";

const MobileAppPromo: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 py-12 font-sans md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-red-50/40 via-red-50/20 to-orange-50/30 px-6 pt-12 text-center shadow-sm md:pt-16">

          {/* Section Label */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-[2px] w-6 bg-red-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              GET OUR MOBILE APP
            </span>
            <span className="h-[2px] w-6 bg-red-600" />
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wide text-gray-900 md:text-4xl">
            EXPERIENCE OUR MOBILE APP
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-3xl text-xs leading-relaxed text-gray-600 md:text-sm">
            Simplify your insurance experience with our mobile app. Access
            your policy details, track claims, and receive updates anytime,
            anywhere.
            <br className="hidden sm:inline" /> Stay in control of your
            coverage with just a few taps. Our mobile app will make insurance
            services more convenient and accessible.
          </p>

          {/* App Store Buttons */}
          <div className="z-10 mb-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              disabled
              title="Google Play app link is not available yet"
              className="flex cursor-not-allowed items-center gap-3 rounded-lg bg-black px-4 py-2 text-white opacity-70 shadow-md"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .67.11.94.31l12.5 9.5-12.5 9.5c-.27.2-.6.31-.94.31-.83 0-1.5-.67-1.5-1.5zm1.5-16.14v15.28l10.05-7.64L4.5 4.36z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-300">
                  GET IT ON
                </div>
                <div className="text-sm font-bold leading-none">
                  Google Play
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled
              title="App Store link is not available yet"
              className="flex cursor-not-allowed items-center gap-3 rounded-lg bg-black px-4 py-2 text-white opacity-70 shadow-md"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.65-.79 1.1-1.9.98-3-.95.04-2.1.64-2.78 1.43-.6.7-1.13 1.83-.99 2.92 1.07.08 2.14-.56 2.79-1.35z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] font-semibold tracking-wider text-gray-300">
                  DOWNLOAD ON THE
                </div>
                <div className="text-sm font-bold leading-none">
                  App Store
                </div>
              </div>
            </button>
          </div>

          {/* Phone Mockups */}
          <div className="relative flex h-56 w-full max-w-md justify-center overflow-hidden sm:h-64">

            {/* Left Phone */}
            <div className="absolute -bottom-10 -left-4 z-0 h-80 w-44 rotate-[-6deg] rounded-[35px] border-4 border-slate-700 bg-slate-900 p-2 shadow-2xl sm:left-4 sm:w-52">
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-gray-200 bg-white">
                <div className="absolute top-2 h-3 w-16 rounded-full bg-black" />

                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#B2432B] text-xl font-bold text-[#B2432B]">
                  P
                </div>

                <p className="mt-3 text-xs font-semibold text-gray-700">
                  Purabi Insurance
                </p>
              </div>
            </div>

            {/* Right Phone */}
            <div className="absolute -bottom-6 z-10 h-[22rem] w-48 rotate-[3deg] rounded-[38px] border-4 border-slate-700 bg-slate-900 p-2 shadow-2xl sm:w-56">
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[30px] border border-gray-200 bg-white">
                <div className="absolute top-2 h-3 w-16 rounded-full bg-black" />

                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-[#B2432B] text-2xl font-extrabold text-[#B2432B] shadow-inner">
                  P
                </div>

                <p className="mt-4 text-sm font-bold text-gray-800">
                  PURABI
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  General Insurance
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;
