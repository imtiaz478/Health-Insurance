import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function ApplyPolicy() {
  const navigate = useNavigate();

  const [insuranceType, setInsuranceType] = useState("HEALTH");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("customerToken");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!coverageAmount || Number(coverageAmount) <= 0) {
      setError("Please enter a valid coverage amount.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/policy-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            insuranceType,
            coverageAmount: Number(coverageAmount),
            details,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit policy application.");
        return;
      }

      setMessage(
        "Your policy application has been submitted successfully!"
      );

      setInsuranceType("HEALTH");
      setCoverageAmount("");
      setDetails("");
    } catch (error) {
      console.error("Policy application error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#A03822]">
            Apply for Insurance Policy
          </h1>

          <p className="mt-3 text-gray-600">
            Submit your insurance application online and our team will review
            it shortly.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
          {message && (
            <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Insurance Type */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Insurance Type
              </label>

              <select
                value={insuranceType}
                onChange={(e) => setInsuranceType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A03822]"
              >
                <option value="HEALTH">Health Insurance</option>
                <option value="MOTOR">Motor Insurance</option>
                <option value="FIRE">Fire Insurance</option>
                <option value="MARINE">Marine Insurance</option>
                <option value="ENGINEERING">Engineering Insurance</option>
                <option value="TRAVEL">Travel Insurance</option>
                <option value="LIFE">Life Insurance</option>
                <option value="OTHER">Other Insurance</option>
              </select>
            </div>

            {/* Coverage Amount */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Coverage Amount (BDT)
              </label>

              <input
                type="number"
                min="1"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                placeholder="Enter coverage amount"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A03822]"
                required
              />
            </div>

            {/* Details */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Additional Details
              </label>

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Tell us about your insurance requirements..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#A03822]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#A03822] px-6 py-3 font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Policy Application"}
            </button>
          </form>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mx-auto mt-5 block text-sm font-medium text-[#A03822] hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}