
import { useState } from "react";
import type { Route } from "./+types/premium-calculator";
import { useNavigate } from "react-router";
import {
  Calculator,
  ShieldCheck,
  ArrowRight,
  LoaderCircle,
  Info,
  Wallet,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Premium Calculator | Purabi General Insurance" },
    {
      name: "description",
      content: "Calculate your estimated insurance premium.",
    },
  ];
}

interface PremiumResult {
  insuranceType: string;
  coverageAmount: number;
  rate: number;
  calculatedPremium: number;
  minimumPremium: number;
  currency: string;
}

const insuranceTypes = [
  { value: "HEALTH", label: "Health Insurance" },
  { value: "MOTOR", label: "Motor Insurance" },
  { value: "FIRE", label: "Fire Insurance" },
  { value: "MARINE", label: "Marine Insurance" },
  { value: "ENGINEERING", label: "Engineering Insurance" },
  { value: "TRAVEL", label: "Travel Insurance" },
  { value: "LIFE", label: "Life Insurance" },
  { value: "OTHER", label: "Other Insurance" },
];

export default function PremiumCalculator() {
  const [insuranceType, setInsuranceType] = useState("MOTOR");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [result, setResult] = useState<PremiumResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCalculate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setResult(null);

    const amount = Number(coverageAmount);

    if (!coverageAmount || !Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid coverage amount.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/premium/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            insuranceType,
            coverageAmount: amount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Calculation failed.");
      }

      setResult(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <main className="min-h-screen bg-[#FAF3F0]">
      <section className="bg-[#A03822] px-4 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <Calculator size={32} />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold sm:text-5xl">
            Insurance Premium Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Calculate an estimated insurance premium based
            on your selected insurance type and coverage amount.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-2 lg:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <ShieldCheck className="text-[#A03822]" size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Calculate Your Premium
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter your insurance details below.
              </p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="insuranceType"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Insurance Type
              </label>

              <select
                id="insuranceType"
                value={insuranceType}
                onChange={(e) => {
                  setInsuranceType(e.target.value);
                  setResult(null);
                  setError("");
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-2 focus:ring-[#A03822]/10"
              >
                {insuranceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="coverageAmount"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Coverage Amount (BDT)
              </label>

              <input
                id="coverageAmount"
                type="number"
                min="1"
                max="1000000000"
                step="any"
                value={coverageAmount}
                onChange={(e) => {
                  setCoverageAmount(e.target.value);
                  setResult(null);
                  setError("");
                }}
                placeholder="Example: 500000"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#A03822] focus:ring-2 focus:ring-[#A03822]/10"
              />

              <p className="mt-2 text-xs text-gray-400">
                Enter your desired insurance coverage amount.
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A03822] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" size={19} />
                  Calculating...
                </>
              ) : (
                <>
                  Calculate Premium
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
                <Wallet className="text-[#A03822]" size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Premium Estimate
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Your estimated calculation result.
                </p>
              </div>
            </div>

            {result ? (
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-500">
                  Estimated Premium
                </p>

                <button
  onClick={() =>
    navigate("/get-quote", {
      state: {
        insuranceType: result.insuranceType,
        coverageAmount: result.coverageAmount,
        estimatedPremium: result.calculatedPremium,
      },
    })
  }
  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 font-semibold text-white transition hover:bg-[#852e1b]"
>
  Continue to Get a Quote
  <ArrowRight size={18} />
</button>

                <h3 className="mt-3 break-words text-3xl font-extrabold text-[#A03822] sm:text-4xl">
                  {formatCurrency(result.calculatedPremium)}
                </h3>

                <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">Insurance Type</span>
                    <span className="text-right font-semibold text-gray-900">
                      {insuranceTypes.find(
                        (type) => type.value === result.insuranceType
                      )?.label}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">Coverage Amount</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(result.coverageAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">Demo Rate</span>
                    <span className="font-semibold text-gray-900">
                      {result.rate}%
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-500">Minimum Premium</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(result.minimumPremium)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-[#FAF3F0] p-4 text-sm text-[#852e1b]">
                  <p className="font-semibold">
                    Estimated calculation only
                  </p>
                  <p className="mt-1 leading-6">
                    This result is not an official insurance quotation.
                    Actual premiums may vary.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <Calculator size={48} className="text-gray-300" />

                <h3 className="mt-4 font-bold text-gray-800">
                  No Calculation Yet
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  Select an insurance type and enter your coverage
                  amount to see your estimated premium.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 shrink-0 text-blue-600" size={20} />

              <div>
                <h3 className="font-bold text-blue-900">
                  Important Disclaimer
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  This calculator uses configurable demo rates for
                  demonstration purposes only. It does not represent
                  official Purabi General Insurance premium rates.
                  Please contact the company for an official quotation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
