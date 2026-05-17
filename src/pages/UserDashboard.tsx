import { useEffect, useState } from "react";
import API from "../api/client";

type Stats = {
  totalBookings: number;
  approved: number;
  pending: number;
  cancelled: number;
};

type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  car: {
    name: string;
    brand: string;
    image: string;
  };
};

const UserDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/user/booking");
      const bookings: Booking[] = res.data.booking || [];

      const totalBookings = bookings.length;
      const approved = bookings.filter((b) => b.status === "approved").length;
      const pending = bookings.filter((b) => b.status === "pending").length;
      const cancelled = bookings.filter((b) => b.status === "cancelled").length;

      setStats({ totalBookings, approved, pending, cancelled });
      setRecentBookings(bookings.slice(0, 3));
    } catch (error) {
      console.error("Error generating metrics stream:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Card = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <div className={`p-5 rounded-xl shadow-sm bg-white border border-gray-100 border-l-4 ${color}`}>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-gray-900">{value}</h2>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-gray-500">Overview of your car rentals</p>
      </div>

      {loading && <p className="text-gray-500 animate-pulse">Loading dashboard summary metrics...</p>}

      {!loading && stats && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Total Bookings" value={stats.totalBookings} color="border-blue-500" />
          <Card title="Approved" value={stats.approved} color="border-green-500" />
          <Card title="Pending" value={stats.pending} color="border-yellow-500" />
          <Card title="Cancelled" value={stats.cancelled} color="border-red-500" />
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 bg-gray-50 p-6 rounded-xl border text-center">No bookings yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentBookings.map((b) => (
                <div key={b._id} className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={b.car?.image}
                    alt={b.car?.name}
                    className="w-full h-40 object-cover bg-gray-100"
                  />
                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-lg leading-tight text-gray-900">{b.car?.name}</h3>
                      <p className="text-sm text-gray-400">{b.car?.brand}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {b.status}
                      </span>
                      <p className="text-base font-bold text-gray-900">
                        ₦{b.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;