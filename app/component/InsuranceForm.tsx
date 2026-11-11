import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  FaHeart,
  FaCar,
  FaSuitcase,
  FaUsers,
  FaShip,
  FaHardHat,
  FaEllipsisH,
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
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("health");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      setSuccess(false);
      return;
    }

    if (trimmedPhone.length < 7 || trimmedPhone.length > 20) {
      setError("Please enter a valid phone number.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
  };

  const handleGetQuote = () => {
    const selected = categories.find(
      (category) => category.id === selectedCategory
    );

    navigate("/get-quote", {
      state: {
        name: name.trim(),
        phone: phone.trim(),
        insuranceType: selected?.label ?? "Health",
      },
    });
  };

  return (
    <section className="w-full bg-[#FAF3F0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8"
          aria-label="Choose insurance category"
        >
          {categories.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedCategory(item.id);
                  setSuccess(false);
                  setError("");
                }}
                className="group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A03822] focus-visible:ring-offset-2 rounded-lg"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-xl transition-all duration-200 ${
                    isSelected
                      ? "bg-[#A03822] text-white shadow-md"
                      : "bg-[#F3E5E0] text-[#A03822] hover:bg-[#ebd5ce]"
                  }`}
                >
                  <IconComponent />
                </div>

                <span
                  className={`text-sm font-semibold transition-colors ${
                    isSelected
                      ? "text-[#A03822]"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-4xl grid-cols-1 items-end gap-4 pt-4 md:grid-cols-[1fr_1fr_auto]"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="insurance-name"
              className="text-base font-bold text-gray-900"
            >
              Name
            </label>

            <input
              id="insurance-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
                setSuccess(false);
              }}
              placeholder="Enter Your Full Name"
              autoComplete="name"
              maxLength={100}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm italic placeholder:not-italic placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A03822]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="insurance-phone"
              className="text-base font-bold text-gray-900"
            >
              Mobile Number
            </label>

            <input
              id="insurance-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
                setSuccess(false);
              }}
              placeholder="Enter Your Valid Phone Number"
              autoComplete="tel"
              maxLength={20}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm italic placeholder:not-italic placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A03822]"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#A03822] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#852e1b] md:w-auto"
          >
            <span>Check Details</span>
            <ArrowUpRight size={18} />
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="w-full max-w-4xl rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {success && (
          <div className="w-full max-w-4xl rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-green-700" />

              <div>
                <h3 className="font-bold text-green-800">
                  Details validated successfully!
                </h3>

                <p className="mt-2 text-sm text-green-800">
                  Name: {name.trim()}
                </p>

                <p className="mt-1 text-sm text-green-800">
                  Insurance:{" "}
                  {categories.find(
                    (category) => category.id === selectedCategory
                  )?.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-green-800">
                  Continue to the quote page to provide more details. Your
                  information has not been sent to a server.
                </p>

                <button
                  type="button"
                  onClick={handleGetQuote}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#852e1b]"
                >
                  Get a Quote
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InsuranceForm;