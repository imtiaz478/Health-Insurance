
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What is Health Insurance?",
    answer:
      "Health insurance is a type of insurance coverage that helps protect individuals and families against eligible medical expenses, subject to the policy's terms, conditions and exclusions.",
  },
  {
    id: 2,
    question: "Why do you need Health Insurance?",
    answer:
      "Health insurance can help reduce the financial burden of unexpected medical expenses and provide financial protection against eligible healthcare costs.",
  },
  {
    id: 3,
    question: "Which Health Insurance policies are available?",
    answer:
      "Available health insurance products, coverage limits and eligibility requirements depend on the policies offered by the insurance provider. Please contact Purabi General Insurance for current product information.",
  },
  {
    id: 4,
    question:
      "What is the difference between an Individual Plan and a Family Plan?",
    answer:
      "An individual plan generally provides coverage for one insured person. A family plan may provide coverage for multiple family members under a shared or separately allocated coverage limit, depending on the policy terms.",
  },
  {
    id: 5,
    question: "How can I submit a Health Insurance claim?",
    answer:
      "Contact Purabi General Insurance for the applicable claim procedure. You may be asked to provide supporting documents such as medical bills, hospital records, prescriptions and other documents required by your policy.",
  },
  {
    id: 6,
    question: "What happens after submitting a claim?",
    answer:
      "After receiving a claim, the insurance provider reviews the submitted documents and checks the claim against the policy terms and conditions. The claim decision and settlement process depend on the policy and claim assessment.",
  },
  {
    id: 7,
    question: "What documents may be required for a Health Insurance claim?",
    answer:
      "Depending on the claim, supporting documents may include a completed claim form, medical reports, prescriptions, hospital bills, payment receipts and discharge summaries. Please confirm the exact requirements with Purabi General Insurance.",
  },
  {
    id: 8,
    question: "How can I contact Purabi General Insurance?",
    answer:
      "You can contact Purabi General Insurance by phone at +880 1714-044146 or by email at purabiinsurance@gmail.com. You can also visit the Contact page on this website.",
  },
];

const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section
      className="w-full bg-white px-4 py-14 sm:px-6 md:py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#A03822]">
            Need Help?
          </p>

          <h2
            id="faq-heading"
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Find answers to common questions about health insurance,
            coverage and claims.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const answerId = `faq-answer-${item.id}`;

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[#E8C4BC] bg-[#FFF9F7]"
                    : "border-gray-100 bg-[#F5F5F5]"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleFaq(item.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-medium text-gray-800 transition-colors hover:text-[#A03822] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A03822]"
                >
                  <span className="text-sm font-semibold sm:text-base">
                    {item.question}
                  </span>

                  <span className="shrink-0 text-[#A03822]">
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    className="border-t border-gray-200/70 px-5 pb-5 pt-4 text-sm leading-7 text-gray-600 sm:text-base"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
