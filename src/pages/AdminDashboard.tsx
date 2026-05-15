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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({ title, value }: any) => (
    <div className="p-4 border rounded-lg">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* TABS */}
      <div className="flex gap-3 border-b pb-3">
        <button onClick={() => setTab("stats")} className="px-3 py-1 border rounded">
          Stats
        </button>

        <button onClick={() => setTab("cars")} className="px-3 py-1 border rounded">
          Manage Cars
        </button>

        <button onClick={() => setTab("bookings")} className="px-3 py-1 border rounded">
          Manage Bookings
        </button>
      </div>

      {/* CONTENT */}
      {tab === "stats" && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <Card title="Cars" value={stats?.totalCars} />
              <Card title="Bookings" value={stats?.totalBookings} />
              <Card title="Approved" value={stats?.approved} />
              <Card title="Pending" value={stats?.pending} />
              <Card title="Cancelled" value={stats?.cancelled} />
            </div>
          )}
        </>
      )}

      {tab === "cars" && <ManageCarsPage />}

      {tab === "bookings" && <ManageBookingsPage />}

    </div>
  );
};

export default AdminDashboard;