import React from 'react';

// Simple Inline SVG Logos for Partners (No external asset files needed)
const PartnerLogos = {
  Walton: () => (
    <svg className="h-8 fill-current text-blue-700" viewBox="0 0 100 40">
      <path d="M10 30 L25 10 L35 25 L45 10 L60 30 L50 30 L42 18 L35 30 L28 18 L20 30 Z" fill="#0052CC"/>
      <text x="62" y="28" fontSize="12" fontWeight="bold" fill="#0052CC">WALTON</text>
    </svg>
  ),
  Incepta: () => (
    <div className="flex items-center gap-1 font-bold text-blue-600 text-lg">
      <span className="text-xl italic">incepta</span>
    </div>
  ),
  Acme: () => (
    <div className="flex items-center gap-1 text-red-600 font-bold tracking-tighter">
      <span className="border border-red-600 rounded-full px-1 text-xs">⚕</span>
      <span>ACME</span>
    </div>
  ),
  Doreen: () => (
    <div className="flex items-center gap-1 text-red-700 font-bold text-xs uppercase">
      <span>Doreen</span>
      <span className="text-red-500 font-normal">Power</span>
    </div>
  ),
  Healthcare: () => (
    <div className="text-[10px] font-semibold text-blue-900 border border-blue-900 p-1 text-center">
      Healthcare Pharmaceuticals
    </div>
  ),
  General: () => (
    <div className="text-[11px] font-bold text-blue-800 tracking-tight">
      GENERAL PHARMA
    </div>
  ),
  Palmal: () => (
    <div className="flex items-center gap-1 text-green-700 font-extrabold text-sm">
      <span className="border-2 border-green-700 px-1">P</span>
      <span>PALMAL</span>
    </div>
  )
};

const partners = [
  { id: 1, component: <PartnerLogos.Walton /> },
  { id: 2, component: <PartnerLogos.Incepta /> },
  { id: 3, component: <PartnerLogos.Acme /> },
  { id: 4, component: <PartnerLogos.Doreen /> },
  { id: 5, component: <PartnerLogos.Healthcare /> },
  { id: 6, component: <PartnerLogos.General /> },
  { id: 7, component: <PartnerLogos.Palmal /> },
];

const processSteps = [
  {
    stepNumber: '01',
    title: 'Get A Quotetation',
    description: "Answer a couple of questions, we'll provide accurate live quotes.",
    // Online Placeholder Image (Unsplash)
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    stepNumber: '02',
    title: 'Complete The Aplication',
    description: "Answer a couple of questions, we'll provide accurate live quotes.",
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300'
  },
  {
    stepNumber: '03',
    title: 'Get your Insurance',
    description: "Answer a couple of questions, we'll provide accurate live quotes.",
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=300'
  },
];

const Partner: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Partners Section */}
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-bold tracking-wider text-gray-800 uppercase mb-6">
            OUR GENUINE TRUSTED PARTNERS &amp; CLIENTS
          </h2>
          <div className="border border-gray-200 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 divide-x divide-y md:divide-y-0 divide-gray-200 rounded-sm bg-white overflow-hidden">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-3 flex items-center justify-center h-20 hover:bg-gray-50 transition-colors"
              >
                {partner.component}
              </div>
            ))}
          </div>
        </div>

       

      </div>
    </section>
  );
};

export default Partner;