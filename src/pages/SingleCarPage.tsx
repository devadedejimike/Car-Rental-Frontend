import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleCar } from "../api/cars";
import { createBooking } from "../api/booking";

type Car = {
  _id: string;
  name: string;
  brand: string;
  pricePerDay: number;
  image: string;
  transmission: string;
  fuelType: string;
  seats: number;
  description: string;
};

const SingleCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const data = await getSingleCar(id as string);
      setCar(data.car);
    } catch (error) {
      console.error("Error loading product interface:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCar();
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      return alert("Please select booking dates");
    }

    try {
      setBookingLoading(true);
      await createBooking({
        carId: id as string,
        startDate,
        endDate,
      });

      alert("Booking created successfully");
      setStartDate("");
      setEndDate("");
      navigate("/my-bookings");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-[500px] w-full bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="p-6 text-center py-20">
        <h3 className="text-xl font-semibold">Car not found</h3>
        <button onClick={() => navigate("/cars")} className="mt-4 text-sm text-blue-600 underline">
          Back to Fleet
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-[450px] object-cover rounded-xl shadow-sm bg-gray-100"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{car.name}</h1>
            <p className="text-xl text-gray-500 mt-1">{car.brand}</p>
          </div>

          <p className="text-gray-700 leading-relaxed">{car.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border p-3 rounded-xl bg-gray-50">
              <span className="text-gray-400 block mb-0.5">Fuel Type</span>
              <p className="font-semibold capitalize">{car.fuelType}</p>
            </div>
            <div className="border p-3 rounded-xl bg-gray-50">
              <span className="text-gray-400 block mb-0.5">Transmission</span>
              <p className="font-semibold capitalize">{car.transmission}</p>
            </div>
            <div className="border p-3 rounded-xl bg-gray-50">
              <span className="text-gray-400 block mb-0.5">Capacity</span>
              <p className="font-semibold">{car.seats} Seats</p>
            </div>
            <div className="border p-3 rounded-xl bg-gray-50">
              <span className="text-gray-400 block mb-0.5">Price Per Day</span>
              <p className="font-semibold text-black">₦{car.pricePerDay.toLocaleString()}</p>
            </div>
          </div>

          <div className="border rounded-xl p-5 space-y-4 bg-white shadow-sm">
            <h2 className="text-xl font-bold">Book This Car</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border p-3 rounded-lg mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border p-3 rounded-lg mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-black text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {bookingLoading ? "Processing Booking..." : "Book Car Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarPage;