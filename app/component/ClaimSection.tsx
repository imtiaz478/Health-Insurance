
import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const ClaimSection: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">

        {/* Left Side: Family Image */}
        <div className="relative flex w-full max-w-md items-center justify-center">
          {/* Decorative Circles */}
          <div className="absolute -z-10 h-72 w-72 scale-110 rounded-full bg-[#FAF3F0] sm:h-80 sm:w-80" />

          <div className="absolute -z-10 h-60 w-60 rounded-full bg-[#F5E6E0] sm:h-64 sm:w-64" />

          {/* Main Image */}
          <img
            src="/family.png"
            alt="Happy family representing insurance protection"
            loading="lazy"
            className="relative z-10 h-auto w-full object-contain"
          />
        </div>

        {/* Right Side: Content Box */}
        <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-[#F3E5E0] bg-[#FAF3F0] p-6 sm:p-10 md:p-12">

          {/* Subheading */}
          <span className="text-xs font-bold tracking-wider text-[#A03822] sm:text-sm">
            BE HAPPY TO GET INSURANCE
          </span>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Need Help With Your Insurance Claim?
          </h2>

          {/* Description */}
          <p className="max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Have questions about your insurance claim? Get in touch with our
            team for assistance with claim-related enquiries and information
            about the required documents and procedures.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2 sm:gap-6">

            {/* CTA Button */}
            <Link
              to="/claim"
              className="inline-flex items-center gap-2 rounded-xl bg-[#A03822] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#852e1b] focus:outline-none focus:ring-2 focus:ring-[#A03822] focus:ring-offset-2"
            >
              <span>Claim Assistance</span>
              <ArrowUpRight size={18} />
            </Link>

            {/* Separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="h-px w-6 bg-gray-300" />
              <span>OR</span>
              <span className="h-px w-6 bg-gray-300" />
            </div>

            {/* Email Contact */}
            <div className="text-xs text-gray-600 sm:text-sm">
              <span>Mail Us Anytime: </span>

              <a
                href="mailto:purabiinsurance@gmail.com"
                className="break-all font-bold text-gray-900 transition-colors hover:text-[#A03822] focus:outline-none focus:underline"
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
