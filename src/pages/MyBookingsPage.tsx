import { useEffect, useState } from "react";
import {
  cancelBooking,
  getUserBookings,
} from "../api/booking";

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
  const [bookings, setBookings] = useState<
    Booking[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data =
        await getUserBookings();

      setBookings(data.booking);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // CANCEL BOOKING
  const handleCancel = async (
    id: string
  ) => {
    const confirmCancel = window.confirm(
      "Cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await cancelBooking(id);

      alert("Booking cancelled");

      fetchBookings();
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to cancel booking"
      );
    }
  };

  // STATUS STYLE
  const getStatusStyle = (
    status: string
  ) => {
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

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage your bookings
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-52 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        bookings.length === 0 && (
          <div className="text-center py-10">
            <p>No bookings found</p>
          </div>
        )}

      {/* BOOKINGS */}
      {!loading &&
        bookings.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl overflow-hidden bg-white shadow-sm"
              >

                {/* IMAGE */}
                <img
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="w-full h-52 object-cover"
                />

                {/* CONTENT */}
                <div className="p-5 space-y-3">

                  {/* TITLE */}
                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.car.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {booking.car.brand}
                    </p>
                  </div>

                  {/* DATES */}
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium">
                        Start:
                      </span>{" "}
                      {new Date(
                        booking.startDate
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      <span className="font-medium">
                        End:
                      </span>{" "}
                      {new Date(
                        booking.endDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div>
                    <p className="text-lg font-bold">
                      ₦
                      {booking.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* CANCEL BUTTON */}
                  {booking.status !==
                    "cancelled" && (
                    <button
                      onClick={() =>
                        handleCancel(
                          booking._id
                        )
                      }
                      className="w-full bg-red-600 text-white py-2 rounded-lg"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default MyBookingsPage;