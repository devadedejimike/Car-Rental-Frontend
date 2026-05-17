import { useEffect, useState } from "react";
import { cancelBooking, getUserBookings } from "../api/booking";

type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  car: {
    name: string;
    brand: string;
    image: string;
    pricePerDay: number;
  };
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings();
      setBookings(data.booking || []);
    } catch (error) {
      console.error("Error fetching context bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    const confirmCancel = window.confirm("Cancel this booking?");
    if (!confirmCancel) return;

    try {
      await cancelBooking(id);
      alert("Booking cancelled successfully");
      fetchBookings();
    } catch (error: any) {
      console.error("Cancellation handling exception:", error);
      alert(error?.response?.data?.message || "Failed to cancel booking");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-gray-500 mt-1">View and manage your bookings</p>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="text-center py-10 border rounded-xl bg-gray-50">
          <p className="text-gray-500">No bookings found</p>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="grid md:grid-cols-2 gap-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={booking.car?.image}
                  alt={booking.car?.name}
                  className="w-full h-52 object-cover bg-gray-100"
                />
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{booking.car?.name}</h2>
                      <p className="text-sm text-gray-500">{booking.car?.brand}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1 bg-gray-50 p-3 rounded-lg">
                    <p>
                      <span className="font-medium text-gray-500">Start:</span>{" "}
                      {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">End:</span>{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="text-xl font-black text-black">
                      ₦{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {booking.status !== "cancelled" && (
                <div className="px-5 pb-5">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;