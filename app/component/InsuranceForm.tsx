import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { 
  FaHeart, 
  FaCar, 
  FaSuitcase, 
  FaUsers, 
  FaShip, 
  FaHardHat, 
  FaEllipsisH 
} from "react-icons/fa";

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: "health", label: "Health", icon: FaHeart },
  { id: "car", label: "Car", icon: FaCar },
  { id: "travel", label: "Travel", icon: FaSuitcase },
  { id: "life", label: "Life", icon: FaUsers },
  { id: "marine", label: "Marine", icon: FaShip },
  { id: "engineering", label: "Engineering", icon: FaHardHat },
  { id: "more", label: "More", icon: FaEllipsisH },
];

const InsuranceForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("health");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedCategory, name, phone });
  };

  return (
    <section className="bg-[#FAF3F0] py-10 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        
        {/* Category Icons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {categories.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCategory(item.id)}
                className="flex flex-col items-center gap-2 group focus:outline-none"
              >
                {/* Circle Icon Button */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-200 ${
                    isSelected
                      ? "bg-[#A03822] text-white shadow-md"
                      : "bg-[#F3E5E0] text-[#A03822] hover:bg-[#ebd5ce]"
                  }`}
                >
                  <IconComponent />
                </div>

                {/* Category Label */}
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isSelected ? "text-[#A03822]" : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Form Section */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-end gap-4 pt-4"
        >
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-900 font-bold text-base">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A03822] italic text-sm placeholder:text-gray-400 placeholder:not-italic"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-900 font-bold text-base">
              Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Valid Phone Number"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A03822] italic text-sm placeholder:text-gray-400 placeholder:not-italic"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#A03822] hover:bg-[#852e1b] text-white font-semibold text-sm px-6 py-3.5 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>Get Price</span>
            <ArrowUpRight size={18} />
          </button>
        </form>

      </div>
    </section>
  );
};

export default InsuranceForm;