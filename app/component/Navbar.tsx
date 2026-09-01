"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* Custom Logo Icon */}
            <div className="w-10 h-10 border-2 border-[#A03822] flex items-center justify-center relative p-1">
              <div className="w-full h-full bg-[#A03822] rounded-tl-full rounded-tr-full rounded-br-full" />
            </div>
            {/* Logo Text */}
            <div className="flex flex-col leading-none">
              <span className="text-[#A03822] font-extrabold text-lg tracking-wide uppercase">
                Purabi General
              </span>
              <span className="text-[#A03822] font-semibold text-xs tracking-wider uppercase">
                Insurance Co. Ltd.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
            <a href="#" className="hover:text-[#A03822] transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-[#A03822] transition-colors">
              About Us
            </a>
            
            {/* Services Dropdown */}
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#A03822] transition-colors">
              <span>Services</span>
              <ChevronDown size={18} />
            </div>

            {/* Claims Dropdown */}
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#A03822] transition-colors">
              <span>Claims</span>
              <ChevronDown size={18} />
            </div>

            <a href="#" className="hover:text-[#A03822] transition-colors">
              Blogs
            </a>
            <a href="#" className="hover:text-[#A03822] transition-colors">
              Contact Us
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#"
              className="bg-[#A03822] hover:bg-[#852e1b] text-white px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Get A Quote</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#A03822] focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4">
          <a href="#" className="block text-gray-800 font-medium hover:text-[#A03822]">
            Home
          </a>
          <a href="#" className="block text-gray-800 font-medium hover:text-[#A03822]">
            About Us
          </a>
          <div className="flex items-center justify-between text-gray-800 font-medium hover:text-[#A03822]">
            <span>Services</span>
            <ChevronDown size={18} />
          </div>
          <div className="flex items-center justify-between text-gray-800 font-medium hover:text-[#A03822]">
            <span>Claims</span>
            <ChevronDown size={18} />
          </div>
          <a href="#" className="block text-gray-800 font-medium hover:text-[#A03822]">
            Blogs
          </a>
          <a href="#" className="block text-gray-800 font-medium hover:text-[#A03822]">
            Contact Us
          </a>
          <a
            href="#"
            className="w-full bg-[#A03822] text-white py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
          >
            <span>Get A Quote</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;