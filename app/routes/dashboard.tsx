import { useEffect, useState } from "react";
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
  const [policyApplications, setPolicyApplications] = useState<PolicyApplication[]>([]);

  // Profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    const storedCustomer = localStorage.getItem("customer");

    if (!token || !storedCustomer) {
      navigate("/login");
      return;
    }

    try {
      const parsedCustomer = JSON.parse(storedCustomer);

      setCustomer(parsedCustomer);
      setProfileName(parsedCustomer.name);
      setProfileEmail(parsedCustomer.email || "");

      fetchMyQuotes(token);
      fetchMyClaims(token);
      fetchPolicyApplications(token);
    } catch {
      localStorage.removeItem("customerToken");
      localStorage.removeItem("customer");
      navigate("/login");
    }
  }, [navigate]);

  // =========================
  // API FETCHERS
  // =========================

  async function fetchMyQuotes(token: string) {
    try {
      setIsLoadingQuotes(true);
      setQuoteError("");

      const response = await fetch(
        "http://localhost:5000/api/quotes/my-quotes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("customer");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your quotes.");
      }

      setQuotes(data.data);
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

      const response = await fetch(
        "http://localhost:5000/api/claims/my-claims",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("customer");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your claims.");
      }

      setClaims(data.data);
    } catch (error) {
      console.error("Get claims error:", error);
      setClaimError(
        error instanceof Error ? error.message : "Failed to load your claims."
      );
    } finally {
      setIsLoadingClaims(false);
    }
  }

  const fetchPolicyApplications = async (token: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/policy-applications/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setPolicyApplications(data.data);
      }
    } catch (error) {
      console.error("Policy applications fetch error:", error);
    }
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  async function updateProfile() {
    try {
      const token = localStorage.getItem("customerToken");

      if (!token) {
        navigate("/login");
        return;
      }

      setIsUpdatingProfile(true);
      setProfileMessage("");
      setProfileError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profileName,
            email: profileEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("customer");
        navigate("/login");
        return;
      }

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
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    navigate("/login");
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
        return {
          className: "bg-green-100 text-green-700 border-green-200",
          icon: <CheckCircle2 size={15} />,
        };
      case "REJECTED":
        return {
          className: "bg-red-100 text-red-700 border-red-200",
          icon: <XCircle size={15} />,
        };
      case "PROCESSING":
      case "UNDER_REVIEW":
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
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your customer information.
                  </p>
                </div>

                <button
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
                  onClick={updateProfile}
                  disabled={isUpdatingProfile}
                  className="flex items-center gap-2 rounded-lg bg-[#A03822] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#852e1b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </button>

                <button
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
            </>
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
            <h3 className="mt-5 text-lg font-bold text-gray-900">Get a Quote</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Request a new insurance quote for your needs.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Request Quote
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/claim"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <ShieldCheck className="text-[#A03822]" size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-gray-900">Submit a Claim</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Submit a new insurance claim to our team.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Submit Claim
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/apply-policy"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF3F0]">
              <User className="text-[#A03822]" size={24} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-gray-900">Apply for Policy</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Submit your direct policy application form.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#A03822]">
              Start Application
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* MY QUOTES */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Quote Requests</h2>
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
              <h3 className="mt-3 font-semibold text-gray-900">No quote requests yet</h3>
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
                  <div key={quote.id} className="rounded-xl border border-gray-200 p-5">
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
              <h3 className="mt-3 font-semibold text-gray-900">No claims submitted yet</h3>
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
                  <div key={claim.id} className="rounded-xl border border-gray-200 p-5">
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
              onClick={() => navigate("/apply-policy")}
              className="rounded-lg bg-[#A03822] px-4 py-2 text-sm font-semibold text-white hover:bg-[#852e1b]"
            >
              + Apply for Policy
            </button>
          </div>

          {policyApplications.length === 0 ? (
            <div className="rounded-lg bg-gray-50 py-10 text-center">
              <p className="text-gray-500">
                You haven't submitted any policy applications yet.
              </p>
              <button
                onClick={() => navigate("/apply-policy")}
                className="mt-3 font-semibold text-[#A03822] hover:underline"
              >
                Apply Now
              </button>
            </div>
          ) : (
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
                          ৳{Number(application.coverageAmount).toLocaleString("en-BD")}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {formatDate(application.createdAt)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
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
      </section>
    </main>
  );
}