
import type { Route } from "./+types/get-quote";
import { useState, type FormEvent } from "react";
import { useLocation } from "react-router";
import { ArrowRight, CheckCircle2, Calculator } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Get a Quote | Purabi General Insurance" },
    {
      name: "description",
      content:
        "Request an insurance quote from Purabi General Insurance Co. Ltd.",
    },
  ];
}

interface QuoteLocationState {
  name?: string;
  phone?: string;
  insuranceType?: string;
  coverageAmount?: number;
  estimatedPremium?: number;
}

const insuranceTypeMap: Record<string, string> = {
  Health: "Health Insurance",
  Car: "Motor Insurance",
  Travel: "Other",
  Life: "Life Insurance",
  Marine: "Marine Insurance",
  Engineering: "Engineering Insurance",
  More: "Other",
};

const backendInsuranceType: Record<string, string> = {
  "Health Insurance": "HEALTH",
  "Motor Insurance": "MOTOR",
  "Fire Insurance": "FIRE",
  "Marine Insurance": "MARINE",
  "Engineering Insurance": "ENGINEERING",
  "Travel Insurance": "TRAVEL",
  "Life Insurance": "LIFE",
  Other: "OTHER",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

export default function GetQuote() {
  const location = useLocation();
  const locationState = (location.state ?? {}) as QuoteLocationState;

  const initialInsuranceType = locationState.insuranceType
    ? insuranceTypeMap[locationState.insuranceType] ??
      locationState.insuranceType
    : "";

  const [name, setName] = useState(locationState.name ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(locationState.phone ?? "");
  const [insuranceType, setInsuranceType] = useState(initialInsuranceType);
  const [details, setDetails] = useState("");

  const [coverageAmount] = useState(locationState.coverageAmount ?? null);
  const [estimatedPremium] = useState(locationState.estimatedPremium ?? null);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedDetails = details.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !insuranceType
    ) {
      setError("Please fill in all required fields.");
      setSubmitted(false);
      return;
    }

    if (trimmedPhone.length < 8) {
      setError("Please enter a valid phone number.");
      setSubmitted(false);
      return;
    }

    const selectedType = backendInsuranceType[insuranceType];

    if (!selectedType) {
      setError("Please select a valid insurance type.");
      return;
    }

    const finalDetails = [
      trimmedDetails,
      coverageAmount
        ? `Coverage Amount: ${formatCurrency(coverageAmount)}`
        : "",
      estimatedPremium
        ? `Estimated Premium (Demo): ${formatCurrency(estimatedPremium)}`
        : "",
      estimatedPremium
        ? "Note: This is a demo estimate, not an official quotation."
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          insuranceType: selectedType,
          details: finalDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quote request.");
      }

      setSubmitted(true);
      setMessage(data.message || "Your quote request was submitted successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setInsuranceType("");
      setDetails("");
    } catch (err) {
      console.error("Quote submission error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#FAF3F0] px-4 py-16 text-center sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#A03822]">
          Insurance Made Simple
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-5xl">
          Get an Insurance Quote
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Tell us what you need. Our team can help you explore suitable
          insurance options.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Find the Right Coverage for You
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Share your contact information and the type of insurance you
            are interested in. You can also describe your requirements
            so they can be reviewed by our team.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Choose your preferred insurance type",
              "Provide your contact details",
              "Describe your coverage requirements",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2
                  className="shrink-0 text-[#A03822]"
                  size={21}
                />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          {coverageAmount !== null && estimatedPremium !== null && (
            <div className="mt-8 rounded-xl border border-orange-200 bg-[#FAF3F0] p-5">
              <div className="flex items-center gap-2 font-bold text-[#A03822]">
                <Calculator size={20} />
                Your Premium Estimate
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-600">Coverage Amount</span>
                  <strong>{formatCurrency(coverageAmount)}</strong>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-600">Estimated Premium</span>
                  <strong className="text-[#A03822]">
                    {formatCurrency(estimatedPremium)}
                  </strong>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-600">
                This is a demo estimate only, not an official insurance quotation.
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900">
            Request Your Quote
          </h2>

          {submitted && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 size={20} />
                Request submitted successfully!
              </div>
              <p className="mt-2">{message}</p>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSubmitted(false);
                setError("");
              }}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitted(false);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              required
              maxLength={20}
              autoComplete="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setSubmitted(false);
                setError("");
              }}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          <div>
            <label htmlFor="insuranceType" className="mb-2 block text-sm font-medium text-gray-700">
              Insurance Type *
            </label>
            <select
              id="insuranceType"
              required
              value={insuranceType}
              onChange={(event) => {
                setInsuranceType(event.target.value);
                setSubmitted(false);
                setError("");
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            >
              <option value="" disabled>
                Select insurance type
              </option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Motor Insurance">Motor Insurance</option>
              <option value="Fire Insurance">Fire Insurance</option>
              <option value="Marine Insurance">Marine Insurance</option>
              <option value="Engineering Insurance">Engineering Insurance</option>
              <option value="Travel Insurance">Travel Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="details" className="mb-2 block text-sm font-medium text-gray-700">
              Additional Details
            </label>
            <textarea
              id="details"
              rows={4}
              maxLength={2000}
              value={details}
              onChange={(event) => {
                setDetails(event.target.value);
                setSubmitted(false);
              }}
              placeholder="Describe your insurance requirements (optional)"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Request a Quote"}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>

          <p className="text-xs leading-5 text-gray-500">
            Your information will be submitted securely to Purabi General Insurance.
          </p>
        </form>
      </section>
    </main>
  );
}
