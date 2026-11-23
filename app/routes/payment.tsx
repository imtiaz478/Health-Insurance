import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Payment {
  id: string;
  amount: number | string;
  paymentMethod: "BKASH" | "NAGAD" | "CARD";
  status: string;
  policy: {
    policyNumber: string;
    insuranceType: string;
  };
}

export default function PaymentPage() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "BKASH" | "NAGAD" | "CARD"
  >("BKASH");

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const token = localStorage.getItem("customerToken");

        const response = await fetch(
          `https://health-insurance-dyap.onrender.com/api/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setPayment(data.payment);
          setPaymentMethod(data.payment.paymentMethod);
        } else {
          setError(data.message || "Payment not found.");
        }
      } catch (error) {
        console.error("Fetch payment error:", error);
        setError("Failed to load payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  const handlePayment = async () => {
    if (!paymentId) return;

    try {
      setProcessing(true);
      setError("");

      const token = localStorage.getItem("customerToken");

      const response = await fetch(
        "https://health-insurance-dyap.onrender.com/api/payments/mock-pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentId,
            paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Payment failed.");
        return;
      }

      navigate(`/payment-receipt/${paymentId}`);
    } catch (error) {
      console.error("Mock payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading payment...</p>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error || "Payment not found."}</p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 rounded-lg border px-5 py-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-orange-600">
            PURABI INSURANCE
          </h1>

          <p className="mt-2 text-gray-500">
            Secure Mock Payment
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Policy</span>
            <span className="font-semibold">
              {payment.policy.policyNumber}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Insurance</span>
            <span className="font-semibold">
              {payment.policy.insuranceType}
            </span>
          </div>

          <div className="flex justify-between border-t pt-3">
            <span className="font-medium">Amount</span>
            <span className="text-xl font-bold text-orange-600">
              ৳{Number(payment.amount).toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        <h2 className="mb-3 text-lg font-semibold">
          Select Payment Method
        </h2>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("BKASH")}
            className={`rounded-xl border p-4 text-left ${
              paymentMethod === "BKASH"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200"
            }`}
          >
            <p className="font-bold">bKash</p>
            <p className="text-sm text-gray-500">
              Pay using bKash
            </p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("NAGAD")}
            className={`rounded-xl border p-4 text-left ${
              paymentMethod === "NAGAD"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200"
            }`}
          >
            <p className="font-bold">Nagad</p>
            <p className="text-sm text-gray-500">
              Pay using Nagad
            </p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("CARD")}
            className={`rounded-xl border p-4 text-left ${
              paymentMethod === "CARD"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200"
            }`}
          >
            <p className="font-bold">Card</p>
            <p className="text-sm text-gray-500">
              Pay using Debit/Credit Card
            </p>
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={processing || payment.status === "SUCCESS"}
          className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing
            ? "Processing Payment..."
            : payment.status === "SUCCESS"
            ? "Payment Already Completed"
            : `Pay ৳${Number(payment.amount).toLocaleString("en-BD")}`}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-3 w-full rounded-xl border px-5 py-3 font-medium"
        >
          Cancel
        </button>

        <p className="mt-5 text-center text-xs text-gray-400">
          This is a demo/mock payment. No real money will be charged.
        </p>
      </div>
    </div>
  );
}