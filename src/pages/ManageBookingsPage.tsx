import { useEffect, useState } from "react";
import {
  approveBooking,
  cancelBookingAdmin,
  getAllBookings,
} from "../api/admin";

type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  user: {
    username: string;
    email: string;
  };
  car: {
    name: string;
    brand: string;
  };
};

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data.booking || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id: string) => {
    await approveBooking(id);
    fetchBookings();
  };

  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    await cancelBookingAdmin(id);
    fetchBookings();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <p className="text-gray-500">Approve and manage bookings</p>
      </div>

      {/* LOADING */}
      {loading && <p>Loading bookings...</p>}

      {/* EMPTY */}
      {!loading && bookings.length === 0 && (
        <p className="text-center py-10">No bookings found</p>
      )}

      {/* TABLE */}
      {!loading && bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Car</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t">

                  <td className="p-3">
                    {b.car.name} ({b.car.brand})
                  </td>

                  <td className="p-3">{b.user.username}</td>
                  <td className="p-3">{b.user.email}</td>

                  <td className="p-3">
                    {new Date(b.startDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {new Date(b.endDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">₦{b.totalPrice}</td>

                  <td className={`p-3 font-semibold ${getStatusStyle(b.status)}`}>
                    {b.status}
                  </td>

                  <td className="p-3 flex gap-2">

                    {b.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(b._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>
                    )}

                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    )}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookingsPage;