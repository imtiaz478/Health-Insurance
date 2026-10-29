import type { Route } from "./+types/get-quote";
import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Get a Quote | Purabi General Insurance" },
    {
      name: "description",
      content: "Request an insurance quote from Purabi General Insurance Co. Ltd.",
    },
  ];
}

export default function GetQuote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const insuranceType = String(
      formData.get("insuranceType") ?? ""
    ).trim();

    if (!name || !email || !phone || !insuranceType) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Frontend demonstration only. No data is sent to a server.
    setSubmitted(true);
    form.reset();
    setIsSubmitting(false);
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
            so they can be reviewed when the form is connected to a backend.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Choose your preferred insurance type",
              "Provide your contact details",
              "Describe your coverage requirements",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="shrink-0 text-[#A03822]" size={21} />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
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
              Your form passed validation! However, your quote request has
              not been sent or saved because the backend is not connected yet.
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={20}
              autoComplete="tel"
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
            />
          </div>

          <div>
            <label
              htmlFor="insuranceType"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Insurance Type *
            </label>
            <select
              id="insuranceType"
              name="insuranceType"
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#A03822]"
            >
              <option value="" disabled>
                Select insurance type
              </option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="Motor Insurance">Motor Insurance</option>
              <option value="Fire Insurance">Fire Insurance</option>
              <option value="Marine Insurance">Marine Insurance</option>
              <option value="Engineering Insurance">
                Engineering Insurance
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="details"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Additional Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              maxLength={2000}
              placeholder="Describe your insurance requirements (optional)"
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Request a Quote"}
            <ArrowRight size={18} />
          </button>

          <p className="text-xs leading-5 text-gray-500">
            This demo form does not send or store your personal information.
          </p>
        </form>
      </section>
    </main>
  );
}