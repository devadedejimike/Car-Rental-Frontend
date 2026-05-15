import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  const [car, setCar] = useState<Car | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [bookingLoading, setBookingLoading] =
    useState(false);

  // FETCH SINGLE CAR
  const fetchCar = async () => {
    try {
      setLoading(true);

      const data = await getSingleCar(
        id as string
      );

      setCar(data.car);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // BOOK CAR
  const handleBooking = async () => {
    if (!startDate || !endDate) {
      return alert(
        "Please select booking dates"
      );
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
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="p-6">
        <div className="h-[500px] bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  // NO CAR
  if (!car) {
    return (
      <div className="p-6">
        <p>Car not found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-8">

        {/* IMAGE */}
        <div>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-5">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold">
              {car.name}
            </h1>

            <p className="text-gray-500">
              {car.brand}
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed">
            {car.description}
          </p>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div className="border p-3 rounded-lg">
              <span className="font-semibold">
                Fuel Type:
              </span>
              <p>{car.fuelType}</p>
            </div>

            <div className="border p-3 rounded-lg">
              <span className="font-semibold">
                Transmission:
              </span>
              <p>{car.transmission}</p>
            </div>

            <div className="border p-3 rounded-lg">
              <span className="font-semibold">
                Seats:
              </span>
              <p>{car.seats}</p>
            </div>

            <div className="border p-3 rounded-lg">
              <span className="font-semibold">
                Price Per Day:
              </span>
              <p>₦{car.pricePerDay}</p>
            </div>
          </div>

          {/* BOOKING FORM */}
          <div className="border rounded-xl p-5 space-y-4">

            <h2 className="text-xl font-bold">
              Book This Car
            </h2>

            <div>
              <label className="text-sm">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {bookingLoading
                ? "Booking..."
                : "Book Car"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarPage;