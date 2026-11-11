import React from "react";
import { Link } from "react-router";

const paymentMethods = [
  { label: "VISA", textClass: "text-blue-700 font-extrabold italic text-lg" },
  { label: "MasterCard", textClass: "text-orange-500 font-bold text-xs" },
  { label: "নগদ", textClass: "text-red-600 font-bold text-sm" },
  { label: "bKash", textClass: "text-pink-600 font-bold text-sm" },
  { label: "রকেট", textClass: "text-purple-700 font-bold text-xs" },
  { label: "উপায়", textClass: "text-yellow-500 font-bold text-xs" },
  { label: "শিওরক্যাশ", textClass: "text-cyan-600 font-bold text-xs" },
  { label: "Taptap Send", textClass: "text-green-600 font-semibold text-xs" },
  { label: "CellFin", textClass: "text-green-700 font-bold text-xs" },
  { label: "DBBL", textClass: "text-blue-600 font-bold text-xs" },
  { label: "City Bank", textClass: "text-red-600 font-semibold text-xs" },
  { label: "Islami Bank", textClass: "text-emerald-700 font-bold text-xs" },
  { label: "BRAC BANK", textClass: "text-blue-800 font-bold text-xs" },
  { label: "UCB", textClass: "text-[#B2432B] font-bold text-xs" },
  { label: "EBL", textClass: "text-cyan-700 font-bold text-xs" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-orange-100/50 bg-[#FAF5F3] font-sans">
      {/* Upper Main Footer Section */}
      <div className="px-4 py-12 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="mb-1 text-sm font-medium text-gray-500">
            Are you ready?
          </p>

          <h2 className="mb-8 text-3xl font-black tracking-tight text-gray-900 md:text-5xl">
            Get Your Insurance Now!
          </h2>

          {/* Buy Now Button */}
          <Link
            to="/get-quote"
            className="mb-10 flex items-center gap-2 rounded-lg bg-[#B2432B] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#963722] hover:shadow-md"
          >
            <span>Buy Now</span>

            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-700 md:gap-8"
          >
            <Link
              to="/"
              className="transition-colors hover:text-[#B2432B]"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="transition-colors hover:text-[#B2432B]"
            >
              About Us
            </Link>

            <Link
              to="/health-insurance"
              className="transition-colors hover:text-[#B2432B]"
            >
              Health Insurance
            </Link>

            <Link
              to="/get-quote"
              className="transition-colors hover:text-[#B2432B]"
            >
              Get a Quote
            </Link>

            <Link
              to="/blogs"
              className="transition-colors hover:text-[#B2432B]"
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-[#B2432B]"
            >
              Contact Us
            </Link>
          </nav>

          {/* Social Links
              Add the company's verified social media URLs when available. */}
          <div className="mb-6 flex items-center gap-5 text-gray-700">
            <span className="text-sm text-gray-500">
              Follow Purabi General Insurance on social media
            </span>
          </div>

          {/* Working Hours */}
          <p className="mb-12 text-xs font-medium text-gray-700">
            Sunday to Thursday : 10 AM to 6 PM
          </p>

          {/* Payment Channels
              These are visual labels only, not working payment buttons. */}
          <div className="w-full text-left">
            <span className="mb-3 block text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Payment Channels
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.label}
                  className="flex h-9 min-w-[70px] items-center justify-center rounded-lg border border-gray-200/80 bg-white px-3 shadow-sm transition-all hover:border-gray-300"
                >
                  <span className={method.textClass}>
                    {method.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              Payment options are displayed for design purposes. Online
              payment is not connected yet.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-200/60 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-gray-600 md:flex-row">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Purabi General Insurance Co. Ltd.
            All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              to="/contact"
              className="transition-colors hover:text-[#B2432B]"
            >
              Terms &amp; Conditions
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-[#B2432B]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-[#B2432B]"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;