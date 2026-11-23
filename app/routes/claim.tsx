import { useState, type FormEvent } from "react";
import type { Route } from "./+types/claim";
import { CheckCircle2, FileText } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit a Claim | Purabi General Insurance" },
    {
      name: "description",
      content:
        "Submit your insurance claim to Purabi General Insurance Co. Ltd.",
    },
  ];
}

export default function Claim() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPolicyNumber = policyNumber.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedDescription
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

    if (trimmedDescription.length < 10) {
      setError("Claim description must be at least 10 characters.");
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch("https://health-insurance-dyap.onrender.com/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          policyNumber: trimmedPolicyNumber,
          description: trimmedDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit your claim.");
      }

      setSubmitted(true);
      setMessage(data.message);

      setName("");
      setEmail("");
      setPhone("");
      setPolicyNumber("");
      setDescription("");
    } catch (err) {
      console.error("Claim submission error:", err);

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
      {/* Header */}
      <section className="bg-[#FAF3F0] px-4 py-16 text-center sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#A03822]">
          Claims Support
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-5xl">
          Submit a Claim
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Submit your claim details and our team will review your request.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        {/* Information */}
        <div className="flex flex-col justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FAF3F0]">
            <FileText className="text-[#A03822]" size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
            We're Here to Help
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Provide your policy and incident details so our claims team can
            review your request.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Provide your contact information",
              "Enter your policy number if available",
              "Describe what happened clearly",
              "Our team will review your claim",
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
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900">
            Claim Information
          </h2>

          {/* Success */}
          {submitted && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 size={20} />
                Claim submitted successfully!
              </div>

              <p className="mt-2">{message}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
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
                setError("");
                setSubmitted(false);
              }}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
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
                setError("");
                setSubmitted(false);
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
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
                setError("");
                setSubmitted(false);
              }}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          {/* Policy Number */}
          <div>
            <label
              htmlFor="policyNumber"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Policy Number
            </label>

            <input
              id="policyNumber"
              type="text"
              maxLength={100}
              value={policyNumber}
              onChange={(event) => {
                setPolicyNumber(event.target.value);
                setError("");
              }}
              placeholder="Enter your policy number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Claim Description *
            </label>

            <textarea
              id="description"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setError("");
                setSubmitted(false);
              }}
              placeholder="Describe what happened and provide relevant details"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting Claim..." : "Submit Claim"}
          </button>

          <p className="text-xs leading-5 text-gray-500">
            Your claim information will be submitted securely for review.
          </p>
        </form>
      </section>
    </main>
  );
}