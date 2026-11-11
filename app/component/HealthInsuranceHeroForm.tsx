
import React, { useState, type FormEvent } from "react";
import {
  User,
  Users,
  Home,
  HeartHandshake,
  ChevronDown,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const HealthPlanFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("self");
  const [selectedCoverage, setSelectedCoverage] = useState("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: "self", label: "For Self", icon: User },
    { id: "couple", label: "For Couple", icon: Users },
    { id: "family", label: "For Family", icon: Home },
    { id: "parents", label: "For Parents", icon: HeartHandshake },
  ];

  const coverages = [
    { id: "all", label: "Show all plans" },
    { id: "1lac", label: "Up to 1 lac" },
    { id: "1to5", label: "1 Lac to 5 Lac" },
    { id: "5to10", label: "5 Lac to 10 Lac" },
  ];

  const selectedCategoryLabel =
    categories.find((item) => item.id === selectedCategory)?.label ?? "";

  const selectedCoverageLabel =
    coverages.find((item) => item.id === selectedCoverage)?.label ?? "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your full name.");
      setSubmitted(false);
      return;
    }

    const cleanedPhone = phone.replace(/[\s-]/g, "");

    if (!/^\+?\d{7,15}$/.test(cleanedPhone)) {
      setError("Please enter a valid mobile number.");
      setSubmitted(false);
      return;
    }

    if (!age) {
      setError("Please select your age range.");
      setSubmitted(false);
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms of Service.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  };

  const resetResult = () => {
    setSubmitted(false);
    setError("");
  };

  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 bg-white px-4 py-12 sm:px-6 md:p-12 lg:flex-row">
      {/* Left Side Illustration */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <img
          src="/man-ins.png"
          alt="Health insurance illustration"
          className="max-h-[480px] max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Right Side Form Card */}
      <div className="w-full max-w-[520px] rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-8">
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Find Your Health Insurance Plan
          </h2>

          {/* Category Tabs */}
          <div className="mb-8 grid grid-cols-4 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    resetResult();
                  }}
                  className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B03A2E]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all sm:h-14 sm:w-14 ${
                      isActive
                        ? "bg-[#B03A2E] text-white shadow-md"
                        : "bg-[#FDEDEC] text-[#B03A2E] group-hover:bg-[#FADBD8]"
                    }`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <span
                    className={`text-center text-[10px] font-semibold sm:text-xs ${
                      isActive ? "text-[#B03A2E]" : "text-gray-500"
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Name and Mobile */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="health-name"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Full Name *
              </label>

              <input
                id="health-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  resetResult();
                }}
                placeholder="Enter Your Full Name"
                autoComplete="name"
                maxLength={100}
                className="w-full rounded-xl bg-[#F4F5F7] px-4 py-3.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#B03A2E]"
              />
            </div>

            <div>
              <label
                htmlFor="health-phone"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Mobile Number *
              </label>

              <input
                id="health-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  resetResult();
                }}
                placeholder="Enter Your Phone Number"
                autoComplete="tel"
                maxLength={20}
                className="w-full rounded-xl bg-[#F4F5F7] px-4 py-3.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#B03A2E]"
              />
            </div>
          </div>

          {/* Age Dropdown */}
          <div className="mb-5">
            <label
              htmlFor="health-age"
              className="mb-1.5 block text-xs font-medium text-gray-600"
            >
              Your Age *
            </label>

            <div className="relative">
              <select
                id="health-age"
                name="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  resetResult();
                }}
                className="w-full cursor-pointer appearance-none rounded-xl bg-[#F4F5F7] px-4 py-3.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#B03A2E]"
              >
                <option value="" disabled>
                  Select your age
                </option>
                <option value="18-25">18 - 25 Years</option>
                <option value="26-35">26 - 35 Years</option>
                <option value="36-50">36 - 50 Years</option>
                <option value="50+">50+ Years</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
            </div>
          </div>

          {/* Coverage Amount */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-medium text-gray-600">
              Health Coverage Amount (৳)
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {coverages.map((cov) => {
                const isActive = selectedCoverage === cov.id;

                return (
                  <button
                    key={cov.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedCoverage(cov.id);
                      resetResult();
                    }}
                    className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-xs font-medium transition-all ${
                      isActive
                        ? "border-[#FADBD8] bg-[#FADBD8] text-[#B03A2E]"
                        : "border-transparent bg-[#F4F5F7] text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cov.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6 flex items-start gap-2">
            <input
              type="checkbox"
              id="health-terms"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                resetResult();
              }}
              className="mt-0.5 h-4 w-4 cursor-pointer accent-[#B03A2E]"
            />

            <label
              htmlFor="health-terms"
              className="cursor-pointer text-xs leading-5 text-gray-700"
            >
              I agree with the{" "}
              <span className="font-bold text-[#B03A2E] underline">
                Terms of Service
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#B03A2E] py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#922B21] focus:outline-none focus:ring-2 focus:ring-[#B03A2E] focus:ring-offset-2"
          >
            <span>See Plans</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        {/* Result */}
        {submitted && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5"
          >
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <h3 className="font-bold">
                Your details have been validated!
              </h3>
            </div>

            <div className="mt-4 space-y-2 text-sm text-green-900">
              <p>
                <strong>Name:</strong> {name.trim()}
              </p>
              <p>
                <strong>Mobile:</strong> {phone.trim()}
              </p>
              <p>
                <strong>Category:</strong> {selectedCategoryLabel}
              </p>
              <p>
                <strong>Age:</strong> {age} years
              </p>
              <p>
                <strong>Coverage:</strong> {selectedCoverageLabel}
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-green-800">
              Your details are ready for review. Actual plan availability,
              coverage conditions and premiums must be confirmed by Purabi
              General Insurance. This demo does not send or save your
              information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HealthPlanFilter;
