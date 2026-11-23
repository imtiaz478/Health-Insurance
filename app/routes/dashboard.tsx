import { useEffect, useState, type FormEvent } from "react";
import type { Route } from "./+types/dashboard";
import { Link, useNavigate } from "react-router";
import {
  User,
  FileText,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Clock3,
  CheckCircle2,
  XCircle,
  Pencil,
  Save,
  X,
} from "lucide-react";

const downloadPolicyPdf = async (policyId: string) => {
  try {
    const token = localStorage.getItem("customerToken");

    const response = await fetch(
      `https://health-insurance-dyap.onrender.com/api/policy-pdf/${policyId}/pdf`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download policy PDF.");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `policy-${policyId}.pdf`;

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF download error:", error);
    alert("Failed to download policy PDF.");
  }
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Customer Dashboard | Purabi General Insurance" },
    {
      name: "description",
      content: "Manage your Purabi General Insurance account.",
    },
  ];
}

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
}

interface Quote {
  id: string;
  insuranceType: string;
  details: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Claim {
  id: string;
  policyNumber: string | null;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface PolicyApplication {
  id: string;
  insuranceType: string;
  coverageAmount: number;
  status: string;
  createdAt: string;
}

interface Policy {
  id: string;
  policyNumber: string;
  insuranceType: string;
  premium: number | string;
  status?: string;
}

interface Payment {
  id: string;
  amount: number | string;
  paymentMethod: "BKASH" | "NAGAD" | "CARD";
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  transactionId: string | null;
  createdAt: string;
  policy: {
    policyNumber: string;
    insuranceType: string;
  };
}

const API_BASE_URL = "https://health-insurance-dyap.onrender.com/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);

  // Quotes
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [quoteError, setQuoteError] = useState("");

  // Claims
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoadingClaims, setIsLoadingClaims] = useState(true);
  const [claimError, setClaimError] = useState("");

  // Policy Applications
  const [policyApplications, setPolicyApplications] = useState<
    PolicyApplication[]
  >([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [applicationError, setApplicationError] = useState("");

  // My Policies
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoadingPolicies, setIsLoadingPolicies] = useState(true);
  const [policyError, setPolicyError] = useState("");

  // Policy Renewals
  const [renewals, setRenewals] = useState<any[]>([]);

  // Payments
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [policySearch, setPolicySearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  function redirectToLogin() {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    navigate("/login");
  }

  const requestPolicyRenewal = async (policyId: string) => {
    try {
      const token = localStorage.getItem("customerToken");

      const response = await fetch(
        "https://health-insurance-dyap.onrender.com/api/policy-renewal/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ policyId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Renewal request failed.");
      }

      alert("Policy renewal request submitted successfully!");
      void fetchMyRenewals();
    } catch (error) {
      console.error("Renewal request error:", error);

      alert(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  const fetchMyRenewals = async () => {
    try {
      const token = localStorage.getItem("customerToken");

      const response = await fetch(
        "https://health-insurance-dyap.onrender.com/api/policy-renewal/my-renewals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRenewals(Array.isArray(data.renewals) ? data.renewals : []);
      }
    } catch (error) {
      console.error("Fetch renewals error:", error);
    }
  };

  useEffect(() => {
    void fetchMyRenewals();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    const storedCustomer = localStorage.getItem("customer");

    if (!token || !storedCustomer) {
      navigate("/login");
      return;
    }

    try {
      const parsedCustomer: Customer = JSON.parse(storedCustomer);

      setCustomer(parsedCustomer);
      setProfileName(parsedCustomer.name);
      setProfileEmail(parsedCustomer.email || "");

      void fetchMyQuotes(token);
      void fetchMyClaims(token);
      void fetchPolicyApplications(token);
      void fetchMyPolicies(token);
      void fetchPayments(token);
    } catch {
      redirectToLogin();
    }
  }, [navigate]);

  // =========================
  // API FETCHERS
  // =========================

  async function fetchMyQuotes(token: string) {
    try {
      setIsLoadingQuotes(true);
      setQuoteError("");

      const response = await fetch(`${API_BASE_URL}/quotes/my-quotes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your quotes.");
      }

      setQuotes(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Get quotes error:", error);
      setQuoteError(
        error instanceof Error ? error.message : "Failed to load your quotes."
      );
    } finally {
      setIsLoadingQuotes(false);
    }
  }

  async function fetchMyClaims(token: string) {
    try {
      setIsLoadingClaims(true);
      setClaimError("");

      const response = await fetch(`${API_BASE_URL}/claims/my-claims`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your claims.");
      }

      setClaims(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Get claims error:", error);
      setClaimError(
        error instanceof Error ? error.message : "Failed to load your claims."
      );
    } finally {
      setIsLoadingClaims(false);
    }
  }

  async function fetchPolicyApplications(token: string) {
    try {
      setIsLoadingApplications(true);
      setApplicationError("");

      const response = await fetch(
        `${API_BASE_URL}/policy-applications/my-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load your policy applications."
        );
      }

      setPolicyApplications(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Policy applications fetch error:", error);
      setApplicationError(
        error instanceof Error
          ? error.message
          : "Failed to load your policy applications."
      );
    } finally {
      setIsLoadingApplications(false);
    }
  }

  async function fetchMyPolicies(token: string) {
    try {
      setIsLoadingPolicies(true);
      setPolicyError("");

      const response = await fetch(`${API_BASE_URL}/policies/my-policies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your policies.");
      }

      const list = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.policies)
          ? data.policies
          : [];
      setPolicies(list);
    } catch (error) {
      console.error("Policies fetch error:", error);
      setPolicyError(
        error instanceof Error ? error.message : "Failed to load your policies."
      );
    } finally {
      setIsLoadingPolicies(false);
    }
  }

  async function fetchPayments(token: string) {
    try {
      setPaymentLoading(true);
      setPaymentError("");

      const response = await fetch(`${API_BASE_URL}/payments/my-payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your payment history.");
      }

      setPayments(Array.isArray(data.payments) ? data.payments : []);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to load your payment history."
      );
    } finally {
      setPaymentLoading(false);
    }
  }

  const filteredPolicies = policies.filter((policy) => {
    const search = policySearch.toLowerCase();

    return (
      policy.policyNumber.toLowerCase().includes(search) ||
      policy.insuranceType.toLowerCase().includes(search)
    );
  });

  const filteredPayments = payments.filter((payment) => {
    const search = paymentSearch.toLowerCase();

    return (
      payment.policy.policyNumber.toLowerCase().includes(search) ||
      payment.paymentMethod.toLowerCase().includes(search) ||
      payment.transactionId?.toLowerCase().includes(search)
    );
  });

  const handlePayPremium = async (policyId: string) => {
    try {
      const token = localStorage.getItem("customerToken");

      const response = await fetch("https://health-insurance-dyap.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          policyId,
          paymentMethod: "BKASH",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to create payment.");
        return;
      }

      window.location.href = `/payment/${data.payment.id}`;
    } catch (error) {
      console.error("Payment creation failed:", error);
      alert("Something went wrong while creating payment.");
    }
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  async function updateProfile(e: FormEvent) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("customerToken");

      if (!token) {
        navigate("/login");
        return;
      }

      if (!profileName.trim()) {
        setProfileError("Full name is required.");
        return;
      }

      setIsUpdatingProfile(true);
      setProfileMessage("");
      setProfileError("");

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileName.trim(),
          email: profileEmail.trim() || null,
        }),
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setCustomer(data.data);
      localStorage.setItem("customer", JSON.stringify(data.data));

      setIsEditingProfile(false);
      setProfileMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      setProfileError(
        error instanceof Error ? error.message : "Failed to update profile."
      );
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    redirectToLogin();
  }

  // =========================
  // FORMAT HELPERS
  // =========================

  function formatInsuranceType(type: string) {
    return type
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "APPROVED":
      case "COMPLETED":
      case "SUCCESS":
        return {
          className: "bg-green-100 text-green-700 border-green-200",
          icon: <CheckCircle2 size={15} />,
        };
      case "REJECTED":
      case "FAILED":
        return {
          className: "bg-red-100 text-red-700 border-red-200",
          icon: <XCircle size={15} />,
        };
      case "PROCESSING":
      case "UNDER_REVIEW":
      case "REFUNDED":
        return {
          className: "bg-blue-100 text-blue-700 border-blue-200",
          icon: <Clock3 size={15} />,
        };
      default:
        return {
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: <Clock3 size={15} />,
        };
    }
  }

  // =========================
  // LOADING STATE
  // =========================

  if (!customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF3F0]">
        <p className="text-gray-600">Loading dashboard...</p>
      </main>
    );
  }

  // =========================
  // DASHBOARD UI
  // =========================

  return (
    <main className="min-h-screen bg-[#FAF3F0]">
      {/* HEADER */}
      <section className="bg-[#A03822] px-4 py-12 text-white sm:py-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-white/80">
              Customer Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Welcome, {customer.name}
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Manage your insurance services from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* PROFILE CARD */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {!isEditingProfile ? (
            <>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF3F0]">
                    <User className="text-[#A03822]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {customer.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {customer.email || "No email provided"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProfileName(customer.name);
                    setProfileEmail(customer.email || "");
                    setProfileMessage("");
                    setProfileError("");
                    setIsEditingProfile(true);
                  }}
                  className="flex w-fit items-center gap-2 rounded-lg border border-[#A03822] px-4 py-2 text-sm font-semibold text-[#A03822] transition hover:bg-[#FAF3F0]"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>

              {profileMessage && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  {profileMessage}
                </div>
              )}

              <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {customer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {customer.email || "Not provided"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={updateProfile}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Edit Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your customer information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingProfile(false);
                    setProfileError("");
                    setProfileMessage("");
                  }}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {profileError && (
                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {profileError}
                </div>
              )}

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#A03822] focus:ring-2 focus:ring-[#A03822]/10"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#A03822] focus:ring-2 focus:ring-[#A03822]/10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customer.phone}
                  disabled
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Phone number cannot be changed here.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="flex items-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditingProfile(false);
                    setProfileError("");
                    setProfileMessage("");
                  }}
                  disabled={isUpdatingProfile}
                  className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Link
            to="/get-quote"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <FileText className="text-[#A03822]" size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Get a Quote
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Request a new insurance quote for your needs.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Request Quote
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/claim"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <ShieldCheck className="text-[#A03822]" size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Submit a Claim
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Submit a new insurance claim to our team.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Submit Claim
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/apply-policy"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <User className="text-[#A03822]" size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Apply for Policy
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Submit your direct policy application form.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Start Application
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>

        {/* MY POLICIES */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Policies</h2>
              <p className="mt-1 text-sm text-gray-500">
                View your active policies and pay premiums.
              </p>
            </div>
          </div>

          {isLoadingPolicies && (
            <div className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              Loading your policies...
            </div>
          )}

          {policyError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {policyError}
            </div>
          )}

          {!isLoadingPolicies && !policyError && policies.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">No policies found yet.</p>
            </div>
          )}

          {!isLoadingPolicies && !policyError && policies.length > 0 && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by policy number or insurance type..."
                  value={policySearch}
                  onChange={(e) => setPolicySearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm text-gray-600">
                      <th className="px-4 py-3">Policy Number</th>
                      <th className="px-4 py-3">Insurance Type</th>
                      <th className="px-4 py-3">Premium</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPolicies.map((policy) => (
                      <tr key={policy.id} className="border-b text-sm">
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {policy.policyNumber}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {formatInsuranceType(policy.insuranceType)}
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900">
                          ৳{Number(policy.premium).toLocaleString("en-BD")}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap items-center gap-2">
                            {policy.status === "ACTIVE" && (
                              <button
                                type="button"
                                onClick={() => handlePayPremium(policy.id)}
                                className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                              >
                                Pay Premium
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => downloadPolicyPdf(policy.id)}
                              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                            >
                              Download Policy PDF
                            </button>
                            <button
                              type="button"
                              onClick={() => requestPolicyRenewal(policy.id)}
                              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                            >
                              Renew Policy
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* My Renewal Requests */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">
            My Renewal Requests
          </h2>

          {renewals.length === 0 ? (
            <p className="text-gray-500">No renewal requests found.</p>
          ) : (
            <div className="grid gap-4">
              {renewals.map((renewal) => (
                <div
                  key={renewal.id}
                  className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
                >
                  <h3 className="font-semibold text-lg text-gray-900">
                    Policy: {renewal.policy?.policyNumber}
                  </h3>

                  <p className="mt-2 text-sm text-gray-700">
                    Insurance Type: {renewal.policy?.insuranceType}
                  </p>

                  <p className="text-sm text-gray-700">
                    Premium: BDT{" "}
                    {Number(renewal.premiumAmount).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-700">
                    Request Date:{" "}
                    {new Date(renewal.createdAt).toLocaleDateString()}
                  </p>

                  <p className="mt-2 text-sm text-gray-700">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        renewal.status === "APPROVED"
                          ? "text-green-600"
                          : renewal.status === "REJECTED"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {renewal.status}
                    </span>
                  </p>

                  {renewal.newExpiryDate && (
                    <p className="mt-1 text-sm text-gray-700">
                      New Expiry Date:{" "}
                      {new Date(renewal.newExpiryDate).toLocaleDateString()}
                    </p>
                  )}

                  {renewal.rejectionReason && (
                    <p className="mt-2 text-sm text-red-600">
                      Rejection Reason: {renewal.rejectionReason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MY QUOTES */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                My Quote Requests
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View your submitted insurance quote requests.
              </p>
            </div>
            <Link
              to="/get-quote"
              className="text-sm font-semibold text-[#A03822] hover:underline"
            >
              Request New Quote
            </Link>
          </div>

          {isLoadingQuotes && (
            <div className="mt-6 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              Loading your quotes...
            </div>
          )}

          {quoteError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {quoteError}
            </div>
          )}

          {!isLoadingQuotes && !quoteError && quotes.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <FileText className="mx-auto text-gray-400" size={32} />
              <h3 className="mt-3 font-semibold text-gray-900">
                No quote requests yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You have not submitted any insurance quote requests.
              </p>
              <Link
                to="/get-quote"
                className="mt-4 inline-block rounded-lg bg-[#A03822] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#852e1b]"
              >
                Get Your First Quote
              </Link>
            </div>
          )}

          {!isLoadingQuotes && !quoteError && quotes.length > 0 && (
            <div className="mt-6 space-y-4">
              {quotes.map((quote) => {
                const status = getStatusStyle(quote.status);
                return (
                  <div
                    key={quote.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Insurance Type
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-gray-900">
                          {formatInsuranceType(quote.insuranceType)}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                      >
                        {status.icon}
                        {formatInsuranceType(quote.status)}
                      </span>
                    </div>

                    {quote.details && (
                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        {quote.details}
                      </p>
                    )}

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
                        Submitted on{" "}
                        <span className="font-medium text-gray-700">
                          {formatDate(quote.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MY CLAIMS */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Claims</h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your submitted insurance claims.
              </p>
            </div>
            <Link
              to="/claim"
              className="text-sm font-semibold text-[#A03822] hover:underline"
            >
              Submit New Claim
            </Link>
          </div>

          {isLoadingClaims && (
            <div className="mt-6 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              Loading your claims...
            </div>
          )}

          {claimError && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {claimError}
            </div>
          )}

          {!isLoadingClaims && !claimError && claims.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <ShieldCheck className="mx-auto text-gray-400" size={32} />
              <h3 className="mt-3 font-semibold text-gray-900">
                No claims submitted yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You have not submitted any insurance claims.
              </p>
              <Link
                to="/claim"
                className="mt-4 inline-block rounded-lg bg-[#A03822] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#852e1b]"
              >
                Submit Your First Claim
              </Link>
            </div>
          )}

          {!isLoadingClaims && !claimError && claims.length > 0 && (
            <div className="mt-6 space-y-4">
              {claims.map((claim) => {
                const status = getStatusStyle(claim.status);
                return (
                  <div
                    key={claim.id}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Policy Number
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-gray-900">
                          {claim.policyNumber || "Not provided"}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                      >
                        {status.icon}
                        {formatInsuranceType(claim.status)}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {claim.description}
                    </p>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
                        Submitted on{" "}
                        <span className="font-medium text-gray-700">
                          {formatDate(claim.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* POLICY APPLICATIONS SECTION */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                My Policy Applications
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Track your submitted insurance applications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/apply-policy")}
              className="rounded-lg bg-[#A03822] px-4 py-2 text-sm font-semibold text-white hover:bg-[#852e1b]"
            >
              + Apply for Policy
            </button>
          </div>

          {isLoadingApplications && (
            <div className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              Loading your policy applications...
            </div>
          )}

          {applicationError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {applicationError}
            </div>
          )}

          {!isLoadingApplications &&
            !applicationError &&
            policyApplications.length === 0 && (
              <div className="rounded-lg bg-gray-50 py-10 text-center">
                <p className="text-gray-500">
                  You haven&apos;t submitted any policy applications yet.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/apply-policy")}
                  className="mt-3 font-semibold text-[#A03822] hover:underline"
                >
                  Apply Now
                </button>
              </div>
            )}

          {!isLoadingApplications &&
            !applicationError &&
            policyApplications.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm text-gray-600">
                      <th className="px-4 py-3">Insurance Type</th>
                      <th className="px-4 py-3">Coverage Amount</th>
                      <th className="px-4 py-3">Application Date</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {policyApplications.map((application) => {
                      const status = getStatusStyle(application.status);
                      return (
                        <tr key={application.id} className="border-b text-sm">
                          <td className="px-4 py-4 font-medium text-gray-800">
                            {formatInsuranceType(application.insuranceType)}
                          </td>

                          <td className="px-4 py-4 text-gray-700">
                            ৳
                            {Number(application.coverageAmount).toLocaleString(
                              "en-BD"
                            )}
                          </td>

                          <td className="px-4 py-4 text-gray-600">
                            {formatDate(application.createdAt)}
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                            >
                              {status.icon}
                              {formatInsuranceType(application.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
        </div>

        {/* MY PAYMENTS */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Payment History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review your insurance premium payments and transaction statuses.
            </p>
          </div>

          {paymentLoading && (
            <div className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              Loading your payment history...
            </div>
          )}

          {paymentError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {paymentError}
            </div>
          )}

          {!paymentLoading && !paymentError && payments.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">
                No payment records found yet.
              </p>
            </div>
          )}

          {!paymentLoading && !paymentError && payments.length > 0 && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by policy number, transaction ID or method..."
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm text-gray-600">
                      <th className="px-4 py-3">Policy</th>
                      <th className="px-4 py-3">Method</th>
                      <th className="px-4 py-3">Transaction ID</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPayments.map((payment) => {
                      const status = getStatusStyle(payment.status);
                      return (
                        <tr key={payment.id} className="border-b text-sm">
                          <td className="px-4 py-4">
                            <p className="font-medium text-gray-900">
                              {payment.policy.policyNumber}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatInsuranceType(payment.policy.insuranceType)}
                            </p>
                          </td>

                          <td className="px-4 py-4 text-gray-700">
                            {formatInsuranceType(payment.paymentMethod)}
                          </td>

                          <td className="px-4 py-4 font-mono text-xs text-gray-600">
                            {payment.transactionId || "—"}
                          </td>

                          <td className="px-4 py-4 font-medium text-gray-900">
                            ৳{Number(payment.amount).toLocaleString("en-BD")}
                          </td>

                          <td className="px-4 py-4 text-gray-600">
                            {formatDate(payment.createdAt)}
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                            >
                              {status.icon}
                              {formatInsuranceType(payment.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}