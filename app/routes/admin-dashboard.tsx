import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface DashboardStats {
  totalCustomers: number;
  totalQuotes: number;
  totalClaims: number;
  totalPolicyApplications: number;
  pendingQuotes: number;
  pendingClaims: number;
  pendingApplications: number;
}

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  createdAt: string;
  _count: {
    quotes: number;
    claims: number;
    policyApplications: number;
  };
}

interface Quote {
  id: string;
  insuranceType: string;
  details: string | null;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
}

interface Claim {
  id: string;
  policyNumber: string | null;
  description: string;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
}

interface PolicyApplication {
  id: string;
  insuranceType: string;
  coverageAmount: number | string;
  details: string;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
}

interface Policy {
  id: string;
  policyNumber: string;
  insuranceType: string;
  coverageAmount: number | string;
  premiumAmount: number | string;
  startDate: string;
  expiryDate: string;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
}

interface AdminPayment {
  id: string;
  amount: number | string;
  paymentMethod: string;
  status: string;
  transactionId: string | null;
  createdAt: string;
  customer: {
    name: string;
    email: string | null;
    phone: string;
  };
  policy: {
    policyNumber: string;
    insuranceType: string;
  };
}

const getStatusBadgeClass = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
    case "APPROVED":
    case "COMPLETED":
    case "PAID":
    case "SUCCESS":
      return "bg-green-100 text-green-700";
    case "PENDING":
    case "PROCESSING":
    case "UNDER_REVIEW":
      return "bg-yellow-100 text-yellow-800";
    case "REJECTED":
    case "CANCELLED":
    case "EXPIRED":
    case "FAILED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [quoteSearch, setQuoteSearch] = useState("");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState("ALL");
  const [claimSearch, setClaimSearch] = useState("");
  const [claimStatusFilter, setClaimStatusFilter] = useState("ALL");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState("ALL");
  const [policySearch, setPolicySearch] = useState("");
  const [policyStatusFilter, setPolicyStatusFilter] = useState("ALL");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [applications, setApplications] = useState<PolicyApplication[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [renewals, setRenewals] = useState<any[]>([]);

  const [updatingQuoteId, setUpdatingQuoteId] = useState<string | null>(null);
  const [updatingClaimId, setUpdatingClaimId] = useState<string | null>(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<
    string | null
  >(null);
  const [policyActionId, setPolicyActionId] = useState<string | null>(null);

  const fetchPolicies = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/policies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(data.message || "Failed to fetch policies");
        return;
      }

      setPolicies(data.policies ?? data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    }
  };

  const fetchAllPayments = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/payments/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setPayments(data.payments ?? data.data ?? []);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  const fetchAllRenewals = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/admin/policy-renewals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRenewals(data.renewals ?? []);
      }
    } catch (error) {
      console.error("Fetch renewal requests error:", error);
    }
  };

  const updateRenewalStatus = async (
    renewalId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      const token = localStorage.getItem("adminToken");

      let rejectionReason = "";

      if (status === "REJECTED") {
        rejectionReason = prompt("Enter rejection reason:") || "";

        if (!rejectionReason.trim()) {
          alert("Rejection reason is required.");
          return;
        }
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/policy-renewals/${renewalId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            ...(status === "REJECTED" && {
              rejectionReason,
            }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update renewal.");
      }

      alert(data.message);

      fetchAllRenewals();
    } catch (error) {
      console.error("Update renewal error:", error);

      alert(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = customerSearch.toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.phone.toLowerCase().includes(search)
    );
  });

  const filteredQuotes = quotes.filter((quote) => {
    const search = quoteSearch.toLowerCase();

    const matchesSearch =
      quote.id.toLowerCase().includes(search) ||
      quote.customer?.name?.toLowerCase().includes(search) ||
      quote.customer?.email?.toLowerCase().includes(search);

    const matchesStatus =
      quoteStatusFilter === "ALL" || quote.status === quoteStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredClaims = claims.filter((claim) => {
    const search = claimSearch.toLowerCase();

    const matchesSearch =
      claim.id.toLowerCase().includes(search) ||
      claim.customer?.name?.toLowerCase().includes(search) ||
      claim.customer?.email?.toLowerCase().includes(search);

    const matchesStatus =
      claimStatusFilter === "ALL" || claim.status === claimStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredApplications = applications.filter((application) => {
    const search = applicationSearch.toLowerCase();

    const matchesSearch =
      application.id.toLowerCase().includes(search) ||
      application.customer?.name?.toLowerCase().includes(search) ||
      application.insuranceType.toLowerCase().includes(search);

    const matchesStatus =
      applicationStatusFilter === "ALL" ||
      application.status === applicationStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredPolicies = policies.filter((policy) => {
    const search = policySearch.toLowerCase();

    const matchesSearch =
      policy.policyNumber.toLowerCase().includes(search) ||
      policy.customer?.name?.toLowerCase().includes(search);

    const matchesStatus =
      policyStatusFilter === "ALL" || policy.status === policyStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter((payment) => {
    const search = paymentSearch.toLowerCase();

    const matchesSearch =
      payment.customer.name.toLowerCase().includes(search) ||
      payment.policy.policyNumber.toLowerCase().includes(search) ||
      payment.transactionId?.toLowerCase().includes(search);

    const matchesStatus =
      paymentStatusFilter === "ALL" || payment.status === paymentStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const updatePolicyStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    setPolicyActionId(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/policies/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await fetchPolicies();
        alert("Policy status updated successfully!");
      } else {
        alert(data.message || "Failed to update policy status.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setPolicyActionId(null);
    }
  };

  const deletePolicy = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this policy?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    setPolicyActionId(id);

    try {
      const response = await fetch(`http://localhost:5000/api/policies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        await fetchPolicies();
        alert("Policy deleted successfully!");
      } else {
        alert(data.message || "Failed to delete policy.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setPolicyActionId(null);
    }
  };

  useEffect(() => {
    fetchAllRenewals();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const [
          profileResponse,
          dashboardResponse,
          customersResponse,
          quotesResponse,
          claimsResponse,
          applicationsResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/admin/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/customers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/quotes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/claims", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/policy-applications", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const profileData = await profileResponse.json();
        const dashboardData = await dashboardResponse.json();
        const customersData = await customersResponse.json();
        const quotesData = await quotesResponse.json();
        const claimsData = await claimsResponse.json();
        const applicationsData = await applicationsResponse.json();

        if (
          !profileResponse.ok ||
          !dashboardResponse.ok ||
          !customersResponse.ok ||
          !quotesResponse.ok ||
          !claimsResponse.ok ||
          !applicationsResponse.ok ||
          !profileData.success ||
          !dashboardData.success ||
          !customersData.success ||
          !quotesData.success ||
          !claimsData.success ||
          !applicationsData.success
        ) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          navigate("/admin/login");
          return;
        }

        setAdmin(profileData.data);
        setStats(dashboardData.data);
        setCustomers(customersData.data);
        setQuotes(quotesData.data);
        setClaims(claimsData.data);
        setApplications(applicationsData.data);

        await fetchPolicies();
        await fetchAllPayments();
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  // Update Quote Status
  const handleQuoteStatusChange = async (quoteId: string, status: string) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const previousStatus = quotes.find((quote) => quote.id === quoteId)?.status;
    setUpdatingQuoteId(quoteId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/quotes/${quoteId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to update quote status.");
        return;
      }

      setQuotes((previousQuotes) =>
        previousQuotes.map((quote) =>
          quote.id === quoteId ? { ...quote, status } : quote
        )
      );

      if (previousStatus) {
        setStats((previousStats) =>
          previousStats
            ? {
                ...previousStats,
                pendingQuotes:
                  previousStats.pendingQuotes +
                  (status === "PENDING" ? 1 : 0) -
                  (previousStatus === "PENDING" ? 1 : 0),
              }
            : previousStats
        );
      }

      alert("Quote status updated successfully!");
    } catch (error) {
      console.error("Quote status update error:", error);
      alert("Something went wrong.");
    } finally {
      setUpdatingQuoteId(null);
    }
  };

  // Update Claim Status
  const handleClaimStatusChange = async (claimId: string, status: string) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const previousStatus = claims.find((claim) => claim.id === claimId)?.status;
    setUpdatingClaimId(claimId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/claims/${claimId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to update claim status.");
        return;
      }

      setClaims((previousClaims) =>
        previousClaims.map((claim) =>
          claim.id === claimId ? { ...claim, status } : claim
        )
      );

      if (previousStatus) {
        setStats((previousStats) =>
          previousStats
            ? {
                ...previousStats,
                pendingClaims:
                  previousStats.pendingClaims +
                  (status === "PENDING" ? 1 : 0) -
                  (previousStatus === "PENDING" ? 1 : 0),
              }
            : previousStats
        );
      }

      alert("Claim status updated successfully!");
    } catch (error) {
      console.error("Claim status update error:", error);
      alert("Something went wrong.");
    } finally {
      setUpdatingClaimId(null);
    }
  };

  // Update Policy Application Status
  const handleApplicationStatusChange = async (
    applicationId: string,
    status: string
  ) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const previousStatus = applications.find(
      (application) => application.id === applicationId
    )?.status;

    setUpdatingApplicationId(applicationId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/policy-applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to update application status.");
        return;
      }

      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application.id === applicationId
            ? { ...application, status }
            : application
        )
      );

      if (previousStatus) {
        setStats((previousStats) =>
          previousStats
            ? {
                ...previousStats,
                pendingApplications:
                  previousStats.pendingApplications +
                  (status === "PENDING" ? 1 : 0) -
                  (previousStatus === "PENDING" ? 1 : 0),
              }
            : previousStats
        );
      }

      if (status === "APPROVED") {
        await fetchPolicies();
      }

      alert("Policy application status updated successfully!");
    } catch (error) {
      console.error("Application status update error:", error);
      alert("Something went wrong.");
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  const cards = [
    { title: "Total Customers", value: stats?.totalCustomers ?? 0 },
    { title: "Total Quotes", value: stats?.totalQuotes ?? 0 },
    { title: "Total Claims", value: stats?.totalClaims ?? 0 },
    {
      title: "Policy Applications",
      value: stats?.totalPolicyApplications ?? 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-8 py-5 flex justify-between items-center">
        <h1 className="text-xl font-bold">Purabi Admin Panel</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Admin Profile */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {admin?.name}!
          </h2>
          <p className="text-gray-500 mt-2">{admin?.email}</p>
        </div>

        {/* Dashboard Overview */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div key={card.title} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500 font-medium">{card.title}</h3>
              <p className="text-3xl font-bold text-orange-500 mt-3">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Pending Overview */}
        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
          Pending Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Pending Quotes</p>
            <p className="text-2xl font-bold text-orange-500 mt-2">
              {stats?.pendingQuotes ?? 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Pending Claims</p>
            <p className="text-2xl font-bold text-orange-500 mt-2">
              {stats?.pendingClaims ?? 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Pending Applications</p>
            <p className="text-2xl font-bold text-orange-500 mt-2">
              {stats?.pendingApplications ?? 0}
            </p>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Customers</h2>
            <p className="text-gray-500 text-sm mt-1">
              All registered customers
            </p>
          </div>

          <div className="p-6 pb-0">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Quotes</th>
                  <th className="px-6 py-4">Claims</th>
                  <th className="px-6 py-4">Applications</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{customer.name}</td>
                      <td className="px-6 py-4">{customer.email || "N/A"}</td>
                      <td className="px-6 py-4">{customer.phone}</td>
                      <td className="px-6 py-4">{customer._count.quotes}</td>
                      <td className="px-6 py-4">{customer._count.claims}</td>
                      <td className="px-6 py-4">
                        {customer._count.policyApplications}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Quotes</h2>
            <p className="text-gray-500 text-sm mt-1">
              Customer quote requests
            </p>
          </div>

          <div className="p-6 pb-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search by quote ID, customer name or email..."
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <select
                value={quoteStatusFilter}
                onChange={(e) => setQuoteStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Insurance</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No quotes found.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium">{quote.customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {quote.customer.email || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">{quote.customer.phone}</td>
                      <td className="px-6 py-4">{quote.insuranceType}</td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="truncate">{quote.details || "N/A"}</p>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={quote.status}
                          disabled={updatingQuoteId === quote.id}
                          onChange={(event) =>
                            handleQuoteStatusChange(quote.id, event.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>

                        {updatingQuoteId === quote.id && (
                          <p className="text-xs text-orange-500 mt-1">
                            Updating...
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">Claims</h2>
            <p className="text-gray-500 text-sm mt-1">
              Customer insurance claim requests
            </p>
          </div>

          <div className="p-6 pb-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search by claim ID, customer name or email..."
                value={claimSearch}
                onChange={(e) => setClaimSearch(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <select
                value={claimStatusFilter}
                onChange={(e) => setClaimStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Policy Number</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredClaims.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No claims found.
                    </td>
                  </tr>
                ) : (
                  filteredClaims.map((claim) => (
                    <tr key={claim.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium">{claim.customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {claim.customer.email || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">{claim.customer.phone}</td>
                      <td className="px-6 py-4">
                        {claim.policyNumber || "N/A"}
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="truncate">{claim.description}</p>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={claim.status}
                          disabled={updatingClaimId === claim.id}
                          onChange={(event) =>
                            handleClaimStatusChange(claim.id, event.target.value)
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="COMPLETED">Completed</option>
                        </select>

                        {updatingClaimId === claim.id && (
                          <p className="text-xs text-orange-500 mt-1">
                            Updating...
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(claim.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policy Applications Table */}
        <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Policy Applications
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Customer policy application requests
            </p>
          </div>

          <div className="p-6 pb-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search by application ID, customer or insurance type..."
                value={applicationSearch}
                onChange={(e) => setApplicationSearch(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

              <select
                value={applicationStatusFilter}
                onChange={(e) => setApplicationStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Insurance</th>
                  <th className="px-6 py-4">Coverage Amount</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No policy applications found.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium">{application.customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {application.customer.email || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">{application.customer.phone}</td>

                      <td className="px-6 py-4">{application.insuranceType}</td>

                      <td className="px-6 py-4">
                        Tk {Number(application.coverageAmount).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="truncate">{application.details || "N/A"}</p>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={application.status}
                          disabled={updatingApplicationId === application.id}
                          onChange={(event) =>
                            handleApplicationStatusChange(
                              application.id,
                              event.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>

                        {updatingApplicationId === application.id && (
                          <p className="text-xs text-orange-500 mt-1">
                            Updating...
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policies Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Policy Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all issued insurance policies.
            </p>
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search by policy number or customer name..."
              value={policySearch}
              onChange={(e) => setPolicySearch(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={policyStatusFilter}
              onChange={(e) => setPolicyStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                  <th className="p-3">Policy Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Insurance Type</th>
                  <th className="p-3">Coverage</th>
                  <th className="p-3">Premium</th>
                  <th className="p-3">Expiry Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (
                    <tr
                      key={policy.id}
                      className="border-b text-sm hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">
                        {policy.policyNumber}
                      </td>

                      <td className="p-3">
                        <div className="font-medium">{policy.customer.name}</div>
                        <div className="text-gray-500 text-xs">
                          {policy.customer.phone}
                        </div>
                      </td>

                      <td className="p-3">{policy.insuranceType}</td>

                      <td className="p-3">
                        ৳{Number(policy.coverageAmount).toLocaleString()}
                      </td>

                      <td className="p-3">
                        ৳{Number(policy.premiumAmount).toLocaleString()}
                      </td>

                      <td className="p-3">
                        {new Date(policy.expiryDate).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            policy.status
                          )}`}
                        >
                          {policy.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={policy.status}
                            disabled={policyActionId === policy.id}
                            onChange={(e) =>
                              updatePolicyStatus(policy.id, e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                          >
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            disabled={policyActionId === policy.id}
                            onClick={() => deletePolicy(policy.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                          >
                            {policyActionId === policy.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-6 text-center text-gray-500 text-sm"
                    >
                      No policies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payments Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Payments</h2>
            <p className="text-sm text-gray-500 mt-1">
              All customer policy payments and transaction records.
            </p>
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search by customer, policy number or transaction ID..."
              value={paymentSearch}
              onChange={(e) => setPaymentSearch(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Policy</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b text-sm hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <div className="font-medium">
                          {payment.customer.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {payment.customer.phone}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="font-medium">
                          {payment.policy.policyNumber}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {payment.policy.insuranceType}
                        </div>
                      </td>

                      <td className="p-3 font-medium">
                        ৳{Number(payment.amount).toLocaleString()}
                      </td>

                      <td className="p-3">{payment.paymentMethod}</td>

                      <td className="p-3 font-mono text-xs">
                        {payment.transactionId || "N/A"}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="p-3 text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-gray-500 text-sm"
                    >
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Policy Renewal Requests */}
        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">
            Policy Renewal Requests
          </h2>

          {renewals.length === 0 ? (
            <p className="text-gray-500">
              No renewal requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">Customer</th>
                    <th className="p-3">Policy Number</th>
                    <th className="p-3">Insurance</th>
                    <th className="p-3">Premium</th>
                    <th className="p-3">Old Expiry</th>
                    <th className="p-3">Request Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {renewals.map((renewal) => (
                    <tr key={renewal.id} className="border-b">
                      <td className="p-3">
                        {renewal.customer.name}
                        <p className="text-sm text-gray-500">
                          {renewal.customer.email}
                        </p>
                      </td>

                      <td className="p-3">
                        {renewal.policy.policyNumber}
                      </td>

                      <td className="p-3">
                        {renewal.policy.insuranceType}
                      </td>

                      <td className="p-3">
                        BDT {Number(renewal.premiumAmount).toLocaleString()}
                      </td>

                      <td className="p-3">
                        {new Date(
                          renewal.oldExpiryDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        {new Date(
                          renewal.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <span className="font-semibold">
                          {renewal.status}
                        </span>
                      </td>

                      <td className="p-3">
                        {renewal.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateRenewalStatus(renewal.id, "APPROVED")
                              }
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateRenewalStatus(renewal.id, "REJECTED")
                              }
                              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500">
                            Processed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}