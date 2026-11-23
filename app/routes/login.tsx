import { useState, type FormEvent } from "react";
import type { Route } from "./+types/login";
import { Link, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Purabi General Insurance" },
    {
      name: "description",
      content: "Login to your Purabi General Insurance customer account.",
    },
  ];
}

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!phone.trim() || !password.trim()) {
      setError("Please enter your phone number and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://health-insurance-dyap.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: phone.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save JWT token
      localStorage.setItem("customerToken", data.data.token);

      // Save customer information
      localStorage.setItem(
        "customer",
        JSON.stringify(data.data.customer)
      );

      setSuccess("Login successful!");

      // Go to customer dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF3F0] px-4 py-12">
      <div className="mx-auto flex min-h-[75vh] max-w-md items-center">
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A03822]">
              Customer Account
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm text-gray-600">
              Login to manage your insurance services.
            </p>
          </div>

          {success && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setError("");
                }}
                placeholder="Enter your phone number"
                maxLength={20}
                autoComplete="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-1 focus:ring-[#A03822]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#A03822] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}