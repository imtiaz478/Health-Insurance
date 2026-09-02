import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What is Health Insurance?",
    answer: "Health insurance is a type of insurance coverage that pays for medical, surgical, and sometimes dental expenses incurred by the insured person."
  },
  {
    id: 2,
    question: "Why do you need a Health Insurance?",
    answer: "It protects you and your family from financial hardship caused by unexpected medical emergencies and rising healthcare costs."
  },
  {
    id: 3,
    question: "Which Health Insurance policies are available now?",
    answer: "We offer Individual Plans, Family Floater Plans, Senior Citizen Plans, and Critical Illness coverage options."
  },
  {
    id: 4,
    question: "Individual Plan vs Family Floater Plan, what is the difference?",
    answer: "An individual plan covers one person with a dedicated sum insured, whereas a family floater plan covers all family members under a single shared coverage amount."
  },
  {
    id: 5,
    question: "How to claim for Health Insurance coverage?",
    answer: "You can submit a claim through our platform by uploading the hospital bills, discharge summary, and necessary medical documents."
  },
  {
    id: 6,
    question: "What happens after claiming Health Insurance coverage?",
    answer: "Our claim team verifies your documents, processes the approval, and disburses the claim amount directly to your bank account or hospital."
  },
  {
    id: 7,
    question: "Why is Bimafy the best place to buy Health Insurance policies?",
    answer: "Bimafy provides instant policy comparison, 100% digital process, hassle-free claim assistance, and exclusive discounted premiums."
  },
  {
    id: 8,
    question: "How to contact Bimafy?",
    answer: "You can reach us via our helpline number, email support, or directly through the live chat feature on our website."
  }
];

const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
        Frequently asked questions
      </h2>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-[#F5F5F5] rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:text-gray-900 focus:outline-none cursor-pointer"
              >
                <span className="text-base md:text-lg">{item.question}</span>
                <span className="ml-4 text-gray-600 flex-shrink-0">
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>

              {/* Answer Box */}
              {isOpen && (
                <div className="px-5 pb-5 text-gray-600 text-sm md:text-base border-t border-gray-200/50 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;