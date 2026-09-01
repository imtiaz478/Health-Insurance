import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-[#A03822] text-white py-2 px-4 md:px-8 text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
          {/* Address */}
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="shrink-0" />
            <span>Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000.</span>
          </div>

          {/* Email */}
          <a
            href="mailto:purabiinsurance@gmail.com"
            className="flex items-center gap-1.5 hover:underline transition-all"
          >
            <Mail size={15} className="shrink-0" />
            <span>purabiinsurance@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+8801714044146"
            className="flex items-center gap-1.5 hover:underline transition-all"
          >
            <Phone size={15} className="shrink-0" />
            <span>+880 1714-044146</span>
          </a>
        </div>

        {/* Right Side: Portals & Social Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Client & Agent Portals */}
          <div className="flex items-center gap-4 uppercase tracking-wide text-xs">
            <a href="#" className="hover:text-gray-200 transition-colors">
              Client Portal
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors">
              Agent Portal
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaTwitter, href: "#" },
              { Icon: FaYoutube, href: "#" },
              { Icon: FaInstagram, href: "#" },
              { Icon: FaLinkedinIn, href: "#" },
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200"
              >
                <Icon size={12} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;