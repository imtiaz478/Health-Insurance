
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

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [applications, setApplications] = useState<PolicyApplication[]>([]);

  const [updatingQuoteId, setUpdatingQuoteId] = useState<string | null>(null);
  const [updatingClaimId, setUpdatingClaimId] = useState<string | null>(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<string | null>(null);

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
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
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
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No quotes found.
                    </td>
                  </tr>
                ) : (
                  quotes.map((quote) => (
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
                          <p className="text-xs text-orange-500 mt-1">Updating...</p>
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
                {claims.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No claims found.
                    </td>
                  </tr>
                ) : (
                  claims.map((claim) => (
                    <tr key={claim.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium">{claim.customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {claim.customer.email || "N/A"}
                        </p>
                      </td>

                      <td className="px-6 py-4">{claim.customer.phone}</td>
                      <td className="px-6 py-4">{claim.policyNumber || "N/A"}</td>

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
                          <p className="text-xs text-orange-500 mt-1">Updating...</p>
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
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No policy applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className="border-t hover:bg-gray-50">
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
      </main>
    </div>
  );
}
