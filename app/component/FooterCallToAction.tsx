import React from 'react';

// Recommended File Name: FooterCallToAction.tsx or FooterBanner.tsx

const paymentMethods = [
  { name: 'Visa', label: 'VISA', isText: true, textClass: 'text-blue-700 font-extrabold italic text-lg' },
  { name: 'Mastercard', label: 'MasterCard', isText: true, textClass: 'text-orange-500 font-bold text-xs' },
  { name: 'Nagad', label: 'নগদ', isText: true, textClass: 'text-red-600 font-bold text-sm' },
  { name: 'bKash', label: 'bKash', isText: true, textClass: 'text-pink-600 font-bold text-sm' },
  { name: 'Rocket', label: 'রকেট', isText: true, textClass: 'text-purple-700 font-bold text-xs' },
  { name: 'Upay', label: 'উপায়', isText: true, textClass: 'text-yellow-500 font-bold text-xs' },
  { name: 'Shurjopay', label: 'শিওরক্যাশ', isText: true, textClass: 'text-cyan-600 font-bold text-xs' },
  { name: 'TapTap Send', label: 'Taptap Send', isText: true, textClass: 'text-green-600 font-semibold text-xs' },
  { name: 'CellFin', label: 'CellFin', isText: true, textClass: 'text-green-700 font-bold text-xs' },
  { name: 'NexusPay', label: 'DBBL', isText: true, textClass: 'text-blue-600 font-bold text-xs' },
  { name: 'City Bank', label: 'city bank', isText: true, textClass: 'text-red-600 font-semibold text-xs' },
  { name: 'Islami Bank', label: 'Islami Bank', isText: true, textClass: 'text-emerald-700 font-bold text-xs' },
  { name: 'BRAC Bank', label: 'BRAC BANK', isText: true, textClass: 'text-blue-800 font-bold text-xs' },
  { name: 'UCB', label: 'UCB', isText: true, textClass: 'text-[#B2432B] font-bold text-xs' },
  { name: 'Eastern Bank', label: 'EBL', isText: true, textClass: 'text-cyan-700 font-bold text-xs' },
];

const FooterCallToAction: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAF5F3] py-12 px-4 md:px-8 font-sans border-t border-orange-100/50">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Call to Action Subtitle */}
        <p className="text-sm text-gray-500 font-medium mb-1">
          Are you ready?
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-8">
          Get Your Insurance Now!
        </h2>

        {/* Action Button */}
        <button className="bg-[#B2432B] hover:bg-[#963722] text-white text-sm font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mb-10">
          <span>Buy Now</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-medium text-gray-700 mb-8">
          <a href="#home" className="hover:text-[#B2432B] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#B2432B] transition-colors">About Us</a>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#B2432B] transition-colors">
            <span>Services</span>
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#B2432B] transition-colors">
            <span>Claims</span>
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <a href="#blogs" className="hover:text-[#B2432B] transition-colors">Blogs</a>
          <a href="#pay-premium" className="hover:text-[#B2432B] transition-colors">Pay Premium</a>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-5 text-gray-700 mb-6">
          <a href="#facebook" aria-label="Facebook" className="hover:text-[#B2432B] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#twitter" aria-label="Twitter" className="hover:text-[#B2432B] transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#instagram" aria-label="Instagram" className="hover:text-[#B2432B] transition-colors">
            <svg className="w-5 h-5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

        {/* Working Hours */}
        <p className="text-xs text-gray-700 font-medium mb-12">
          Sunday to Thursday : 10 AM to 6 PM
        </p>

        {/* Payment Channels Section */}
        <div className="w-full text-left">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-3">
            Payment Channels
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200/80 rounded-lg px-3 py-2 min-w-[70px] h-9 flex items-center justify-center shadow-2xs hover:border-gray-300 transition-all"
              >
                <span className={method.textClass}>{method.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterCallToAction;