
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

interface Payment {
  id: string;
  amount: number | string;
  paymentMethod: string;
  status: string;
  transactionId: string | null;
  createdAt: string;
  policy: {
    policyNumber: string;
    insuranceType: string;
  };
}

export default function PaymentReceipt() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (error) {
        console.error("Failed to fetch receipt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  if (loading) {
    return <div className="p-10 text-center">Loading receipt...</div>;
  }

  if (!payment) {
    return <div className="p-10 text-center">Receipt not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-orange-600">
            PURABI INSURANCE
          </h1>
          <h2 className="mt-3 text-xl font-semibold">
            Payment Receipt
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Payment confirmation details
          </p>
        </div>

        <hr />

        <div className="my-6 space-y-4">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Receipt ID</span>
            <span className="font-medium">{payment.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Policy Number</span>
            <span className="font-medium">
              {payment.policy.policyNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Insurance Type</span>
            <span className="font-medium">
              {payment.policy.insuranceType}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium">
              {payment.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium">
              {payment.transactionId || "Not available"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">
              {new Date(payment.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="text-xl font-bold text-orange-600">
              ৳{Number(payment.amount).toLocaleString("en-BD")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span className="font-semibold">
              {payment.status}
            </span>
          </div>
        </div>

        <hr />

        <div className="mt-6 text-center">
          {payment.status === "SUCCESS" ? (
            <p className="font-semibold text-green-600">
              Payment Successful
            </p>
          ) : (
            <p className="font-semibold text-yellow-600">
              Payment {payment.status} — Not a confirmed payment receipt
            </p>
          )}

          <div className="mt-6 flex justify-center gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
            >
              Print Receipt
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg border px-5 py-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
