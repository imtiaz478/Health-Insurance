
import React from "react";
import { Link } from "react-router";
import {
  ShieldCheck,
  FileText,
  ClipboardCheck,
  Headset,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Insurance Protection",
    description:
      "Explore insurance coverage options designed to help protect your health, property and other valuable assets.",
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: "Simple Application",
    description:
      "Share your insurance requirements and contact information to begin your enquiry.",
  },
  {
    id: 3,
    icon: Headset,
    title: "Customer Assistance",
    description:
      "Contact our team for information about insurance products, documentation and claim-related enquiries.",
  },
];

const processSteps = [
  {
    stepNumber: "01",
    title: "Choose Your Insurance",
    description:
      "Explore available insurance categories and select the coverage you are interested in.",
    icon: ShieldCheck,
  },
  {
    stepNumber: "02",
    title: "Submit Your Enquiry",
    description:
      "Provide your contact details and describe your insurance requirements through our enquiry form.",
    icon: FileText,
  },
  {
    stepNumber: "03",
    title: "Get Assistance",
    description:
      "Contact the Purabi team to discuss applicable coverage, policy conditions and next steps.",
    icon: Headset,
  },
];

const PartnersAndProcess: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 py-14 font-sans sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-16">

        {/* Insurance Benefits Section */}
        <div>
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#A03822]">
              Why Choose Us
            </p>

            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-3xl">
              Insurance Made Simple
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-600">
              Explore insurance solutions and get information about coverage,
              application requirements and customer assistance from Purabi
              General Insurance Co. Ltd.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.id}
                  className="rounded-2xl border border-gray-100 bg-[#FAF3F0] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#A03822] shadow-sm">
                    <Icon size={30} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Process Section */}
        <div className="relative overflow-hidden rounded-2xl bg-[#752D20] px-5 py-12 shadow-xl sm:px-8 md:px-10">

          {/* Decorative Background */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative z-10 mx-auto max-w-5xl text-center text-white">

            {/* Header */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-white/70" />

              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
                Insurance Simplified
              </span>

              <span className="h-px w-6 bg-white/70" />
            </div>

            <h2 className="mb-4 text-2xl font-extrabold uppercase tracking-wide sm:text-3xl md:text-4xl">
              Our Working Process
            </h2>

            <p className="mx-auto mb-12 max-w-3xl text-sm leading-7 text-white/85">
              Getting started with an insurance enquiry is simple. Follow
              these steps to explore your options and get assistance from
              our team.
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/50 bg-white/10 shadow-lg sm:h-28 sm:w-28">
                      <Icon className="h-10 w-10 text-white sm:h-12 sm:w-12" />

                      <div className="absolute -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#A03822] text-xs font-bold text-white shadow-md">
                        {step.stepNumber}
                      </div>
                    </div>

                    {/* Step Info */}
                    <h3 className="mb-3 text-base font-bold text-white sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="max-w-xs text-sm leading-6 text-white/80">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link
                to="/get-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#A03822] shadow-md transition-all hover:bg-[#FAF3F0] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#752D20]"
              >
                Get a Quote
                <ArrowUpRight size={18} />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnersAndProcess;
