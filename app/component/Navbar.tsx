import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isClaimsOpen, setIsClaimsOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsClaimsOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive
        ? "font-semibold text-[#A03822]"
        : "text-gray-800 hover:text-[#A03822]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-3"
            aria-label="Purabi General Insurance Home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center border-2 border-[#A03822] p-1">
              <div className="h-full w-full rounded-tl-full rounded-tr-full rounded-br-full bg-[#A03822]" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold uppercase tracking-wide text-[#A03822]">
                Purabi General
              </span>

              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#A03822]">
                Insurance Co. Ltd.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-7 font-medium md:flex">

            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>

            {/* Services Dropdown */}
            <div className="group relative">
              <button
                type="button"
                aria-expanded={isServicesOpen}
                onClick={() => {
                  setIsServicesOpen(!isServicesOpen);
                  setIsClaimsOpen(false);
                }}
                className="flex items-center gap-1 text-gray-800 transition-colors hover:text-[#A03822]"
              >
                Services

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-50 mt-3 w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-xl ${
                  isServicesOpen || "hidden group-hover:block"
                }`}
              >
                <Link
                  to="/health-insurance"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
                >
                  Health Insurance
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
                >
                  Other Insurance Services
                </Link>

                <Link
                  to="/get-quote"
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Claims Dropdown */}
            <div className="group relative">
              <button
                type="button"
                aria-expanded={isClaimsOpen}
                onClick={() => {
                  setIsClaimsOpen(!isClaimsOpen);
                  setIsServicesOpen(false);
                }}
                className="flex items-center gap-1 text-gray-800 transition-colors hover:text-[#A03822]"
              >
                Claims

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isClaimsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full z-50 mt-3 w-52 rounded-lg border border-gray-100 bg-white py-2 shadow-xl ${
                  isClaimsOpen || "hidden group-hover:block"
                }`}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsClaimsOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
                >
                  Claim Assistance
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsClaimsOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
                >
                  Contact for Claims
                </Link>
              </div>
            </div>

            <NavLink to="/blogs" className={navLinkClass}>
              Blogs
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </div>

          {/* Desktop Auth + CTA */}
          <div className="hidden items-center gap-3 md:flex">

            <Link
              to="/login"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-[#FAF3F0] hover:text-[#A03822]"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-md border border-[#A03822] px-4 py-2.5 text-sm font-semibold text-[#A03822] transition-colors hover:bg-[#A03822] hover:text-white"
            >
              Sign Up
            </Link>

            <Link
              to="/get-quote"
              className="flex items-center gap-2 rounded-md bg-[#A03822] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#852e1b]"
            >
              <span>Get A Quote</span>
              <ArrowUpRight size={18} />
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="rounded-md p-2 text-gray-700 transition-colors hover:text-[#A03822] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A03822] md:hidden"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="space-y-4 border-t border-gray-100 bg-white px-4 pb-6 pt-4 shadow-lg md:hidden">

          <NavLink
            to="/"
            end
            onClick={closeMobileMenu}
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={`block ${navLinkClass({ isActive: false })}`}
          >
            About Us
          </NavLink>

          {/* Mobile Services Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              aria-expanded={isServicesOpen}
              className="flex w-full items-center justify-between font-medium text-gray-800 hover:text-[#A03822]"
            >
              Services

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isServicesOpen && (
              <div className="mt-3 space-y-3 border-l-2 border-[#A03822] pl-4">
                <Link
                  to="/health-insurance"
                  onClick={closeMobileMenu}
                  className="block text-sm text-gray-600 hover:text-[#A03822]"
                >
                  Health Insurance
                </Link>

                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="block text-sm text-gray-600 hover:text-[#A03822]"
                >
                  Other Insurance Services
                </Link>

                <Link
                  to="/get-quote"
                  onClick={closeMobileMenu}
                  className="block text-sm text-gray-600 hover:text-[#A03822]"
                >
                  Request a Quote
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Claims Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setIsClaimsOpen(!isClaimsOpen)}
              aria-expanded={isClaimsOpen}
              className="flex w-full items-center justify-between font-medium text-gray-800 hover:text-[#A03822]"
            >
              Claims

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isClaimsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isClaimsOpen && (
              <div className="mt-3 space-y-3 border-l-2 border-[#A03822] pl-4">
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block text-sm text-gray-600 hover:text-[#A03822]"
                >
                  Claim Assistance
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block text-sm text-gray-600 hover:text-[#A03822]"
                >
                  Contact for Claims
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/blogs"
            onClick={closeMobileMenu}
            className={navLinkClass}
          >
            Blogs
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={navLinkClass}
          >
            Contact Us
          </NavLink>

          {/* Mobile Auth */}
          <div className="flex gap-3 pt-2">

            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="flex flex-1 items-center justify-center rounded-md border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:border-[#A03822] hover:text-[#A03822]"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMobileMenu}
              className="flex flex-1 items-center justify-center rounded-md border border-[#A03822] py-3 text-sm font-semibold text-[#A03822] hover:bg-[#A03822] hover:text-white"
            >
              Sign Up
            </Link>

          </div>

          {/* Mobile CTA */}
          <Link
            to="/get-quote"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#A03822] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#852e1b]"
          >
            <span>Get A Quote</span>
            <ArrowUpRight size={18} />
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;