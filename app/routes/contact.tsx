
import type { Route } from "./+types/contact";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us | Purabi General Insurance" },
    {
      name: "description",
      content: "Contact Purabi General Insurance Co. Ltd. for inquiries.",
    },
  ];
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const text = String(formData.get("message") ?? "").trim();

    if (!name || !email || text.length < 10) {
      setIsSuccess(false);
      setMessage("Please fill in all fields. Message must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(
        "https://health-insurance-dyap.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message: text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit your message.");
      }

      setIsSuccess(true);
      setMessage(data.message || "Your message has been submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      setIsSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#FAF3F0] px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
          Contact Us
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Have a question? Get in touch with our team.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-14 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>

          <div className="flex items-start gap-3">
            <MapPin className="mt-1 text-[#A03822]" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Office Address
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Sandhani Life Tower (2nd Floor), 34 Bangla Motor, Dhaka - 1000.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-[#A03822]" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Phone
              </h3>

              <a
                href="tel:+8801714044146"
                className="text-sm text-gray-600 hover:text-[#A03822]"
              >
                +880 1714-044146
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-[#A03822]" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Email
              </h3>

              <a
                href="mailto:purabiinsurance@gmail.com"
                className="text-sm text-gray-600 hover:text-[#A03822]"
              >
                purabiinsurance@gmail.com
              </a>
            </div>
          </div>
        </div>

        <form
          className="space-y-4 rounded-2xl border border-gray-200 p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-gray-900">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            maxLength={100}
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            maxLength={254}
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822]"
          />

          {message && (
            <p
              role="status"
              className={`rounded-lg p-3 text-sm leading-6 ${
                isSuccess
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
}
