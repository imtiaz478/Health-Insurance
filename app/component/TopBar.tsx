import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const socialLinks = [
  { name: "Facebook", Icon: FaFacebookF, href: "" },
  { name: "Twitter", Icon: FaTwitter, href: "" },
  { name: "YouTube", Icon: FaYoutube, href: "" },
  { name: "Instagram", Icon: FaInstagram, href: "" },
  { name: "LinkedIn", Icon: FaLinkedinIn, href: "" },
];

const TopBar: React.FC = () => {
  return (
    <div className="bg-[#A03822] px-4 py-2 text-xs font-medium text-white sm:text-sm md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 lg:flex-row">
        {/* Left Side: Contact Information */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
          {/* Office Address */}
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="shrink-0" />

            <span>
              Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000.
            </span>
          </div>

          {/* Email */}
          <a
            href="mailto:purabiinsurance@gmail.com"
            aria-label="Email Purabi General Insurance"
            className="flex items-center gap-1.5 transition-all hover:underline"
          >
            <Mail size={15} className="shrink-0" />

            <span>purabiinsurance@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+8801714044146"
            aria-label="Call Purabi General Insurance"
            className="flex items-center gap-1.5 transition-all hover:underline"
          >
            <Phone size={15} className="shrink-0" />

            <span>+880 1714-044146</span>
          </a>
        </div>

        {/* Right Side: Portals and Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Client and Agent Portals */}
          <div className="flex items-center gap-4 text-xs uppercase tracking-wide">
            <span
              aria-disabled="true"
              title="Client portal link has not been configured yet"
              className="cursor-not-allowed text-white/70"
            >
              Client Portal
            </span>

            <span
              aria-disabled="true"
              title="Agent portal link has not been configured yet"
              className="cursor-not-allowed text-white/70"
            >
              Agent Portal
            </span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ name, Icon, href }) => {
              if (!href) {
                return (
                  <span
                    key={name}
                    aria-label={`${name} link not configured`}
                    title={`${name} link has not been configured yet`}
                    className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full bg-white/10 text-white/60"
                  >
                    <Icon size={12} aria-hidden="true" />
                  </span>
                );
              }

              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${name} page`}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/30"
                >
                  <Icon size={12} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;