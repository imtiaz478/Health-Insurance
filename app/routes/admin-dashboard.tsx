
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

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [updatingQuoteId, setUpdatingQuoteId] = useState<string | null>(null);

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
        ]);

        const profileData = await profileResponse.json();
        const dashboardData = await dashboardResponse.json();
        const customersData = await customersResponse.json();
        const quotesData = await quotesResponse.json();

        if (
          !profileResponse.ok ||
          !dashboardResponse.ok ||
          !customersResponse.ok ||
          !quotesResponse.ok ||
          !profileData.success ||
          !dashboardData.success ||
          !customersData.success ||
          !quotesData.success
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

  const handleQuoteStatusChange = async (
    quoteId: string,
    status: string
  ) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

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
          quote.id === quoteId
            ? { ...quote, status }
            : quote
        )
      );

      setStats((previousStats) =>
        previousStats
          ? {
              ...previousStats,
              pendingQuotes:
                previousStats.pendingQuotes +
                (status === "PENDING" ? 1 : 0) -
                (quotes.find((quote) => quote.id === quoteId)?.status === "PENDING" ? 1 : 0),
            }
          : previousStats
      );

      alert("Quote status updated successfully!");
    } catch (error) {
      console.error("Quote status update error:", error);
      alert("Something went wrong.");
    } finally {
      setUpdatingQuoteId(null);
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
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {admin?.name}!
          </h2>
          <p className="text-gray-500 mt-2">{admin?.email}</p>
        </div>

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
                            handleQuoteStatusChange(
                              quote.id,
                              event.target.value
                            )
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
      </main>
    </div>
  );
}
