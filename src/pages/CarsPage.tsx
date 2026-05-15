import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../api/cars";

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

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    try {
      setLoading(true);

      const data = await getCars();

      setCars(data.car);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // SEARCH FILTER
  const filteredCars = cars.filter((car) => {
    const term = search.toLowerCase();

    return (
      car.name.toLowerCase().includes(term) ||
      car.brand.toLowerCase().includes(term) ||
      car.transmission.toLowerCase().includes(term) ||
      car.fuelType.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Available Cars
        </h1>

        <p className="text-gray-500 mt-1">
          Browse and book available cars
        </p>
      </div>

      {/* SEARCH */}
      <div>
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded-lg outline-none"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredCars.length === 0 && (
        <div className="text-center py-10">
          <p>No cars found</p>
        </div>
      )}

      {/* CARS GRID */}
      {!loading && filteredCars.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              
              {/* IMAGE */}
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-52 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 space-y-3">

                {/* NAME */}
                <div>
                  <h2 className="text-xl font-bold">
                    {car.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {car.brand}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {car.description}
                </p>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">
                      Fuel:
                    </span>{" "}
                    {car.fuelType}
                  </div>

                  <div>
                    <span className="font-medium">
                      Seats:
                    </span>{" "}
                    {car.seats}
                  </div>

                  <div>
                    <span className="font-medium">
                      Gear:
                    </span>{" "}
                    {car.transmission}
                  </div>

                  <div>
                    <span className="font-medium">
                      Price:
                    </span>{" "}
                    ₦{car.pricePerDay}/day
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">

                  <Link
                    to={`/cars/${car._id}`}
                    className="flex-1 border border-black text-center py-2 rounded-lg"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/cars/${car._id}`}
                    className="flex-1 bg-black text-white text-center py-2 rounded-lg"
                  >
                    Book Now
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPage;