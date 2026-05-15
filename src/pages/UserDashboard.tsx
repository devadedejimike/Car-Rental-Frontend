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

      const bookings: Booking[] = res.data.booking;

      // Calculate stats from bookings
      const totalBookings = bookings.length;
      const approved = bookings.filter(b => b.status === "approved").length;
      const pending = bookings.filter(b => b.status === "pending").length;
      const cancelled = bookings.filter(b => b.status === "cancelled").length;

      setStats({
        totalBookings,
        approved,
        pending,
        cancelled,
      });

      // last 3 bookings
      setRecentBookings(bookings.slice(0, 3));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    <div className={`p-5 rounded-xl shadow bg-white border-l-4 ${color}`}>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-gray-500">Overview of your car rentals</p>
      </div>

      {/* LOADING */}
      {loading && <p>Loading dashboard...</p>}

      {/* STATS */}
      {!loading && stats && (
        <div className="grid md:grid-cols-4 gap-4">

          <Card
            title="Total Bookings"
            value={stats.totalBookings}
            color="border-blue-500"
          />

          <Card
            title="Approved"
            value={stats.approved}
            color="border-green-500"
          />

          <Card
            title="Pending"
            value={stats.pending}
            color="border-yellow-500"
          />

          <Card
            title="Cancelled"
            value={stats.cancelled}
            color="border-red-500"
          />
        </div>
      )}

      {/* RECENT BOOKINGS */}
      {!loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Bookings</h2>

          {recentBookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="border rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <img
                    src={b.car.image}
                    alt={b.car.name}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold">{b.car.name}</h3>
                    <p className="text-sm text-gray-500">{b.car.brand}</p>

                    <p className="text-sm">
                      Status:{" "}
                      <span className="font-semibold">{b.status}</span>
                    </p>

                    <p className="text-sm font-bold">
                      ₦{b.totalPrice.toLocaleString()}
                    </p>
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