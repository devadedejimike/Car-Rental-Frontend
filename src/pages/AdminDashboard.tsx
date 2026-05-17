import { useEffect, useState } from "react";
import API from "../api/client";
import ManageCarsPage from "./ManageCarsPage";
import ManageBookingsPage from "./ManageBookingsPage";

type Stats = {
  totalCars: number;
  totalBookings: number;
  approved: number;
  pending: number;
  cancelled: number;
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"stats" | "cars" | "bookings">("stats");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/dashboard-stats");
      setStats(res.data.stats);
    } catch (err) {
      console.error("Error executing system metrics aggregation fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: number;
    color: string;
  }) => (
    <div className={`p-5 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 ${color}`}>
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
      <h2 className="text-3xl font-black text-gray-900 mt-2">
        {value !== undefined ? value.toLocaleString() : 0}
      </h2>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your car rental system activity.</p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setTab("stats")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === "stats"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setTab("cars")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === "cars"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border"
          }`}
        >
          Manage Cars
        </button>

        <button
          onClick={() => setTab("bookings")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === "bookings"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100 border"
          }`}
        >
          Manage Bookings
        </button>
      </div>

      {/* CONTENT SEGMENTS */}
      {tab === "stats" && (
        <div className="space-y-4">
          {loading && (
            <div className="grid md:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-xl" />
              ))}
            </div>
          )}

          {!loading && stats && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card
                title="Total Cars"
                value={stats.totalCars}
                color="border-gray-900"
              />

              <Card
                title="Total Bookings"
                value={stats.totalBookings}
                color="border-gray-400"
              />

              <Card
                title="Approved Bookings"
                value={stats.approved}
                color="border-gray-600"
              />

              <Card
                title="Pending Bookings"
                value={stats.pending}
                color="border-gray-300"
              />

              <Card
                title="Cancelled Bookings"
                value={stats.cancelled}
                color="border-gray-200"
              />
            </div>
          )}

          {!loading && !stats && (
            <p className="text-gray-500 border p-6 rounded-xl bg-gray-50 text-center text-sm">
              Could not load dashboard information. Please refresh the page.
            </p>
          )}
        </div>
      )}

      {tab === "cars" && (
        <div className="border rounded-xl p-4 bg-white shadow-sm animate-fadeIn">
          <ManageCarsPage />
        </div>
      )}

      {tab === "bookings" && (
        <div className="border rounded-xl p-4 bg-white shadow-sm animate-fadeIn">
          <ManageBookingsPage />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;