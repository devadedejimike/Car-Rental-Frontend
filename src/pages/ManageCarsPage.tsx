import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCar } from "../api/admin";
import { getCars } from "../api/cars";

type Car = {
  _id: string;
  name: string;
  brand: string;
  image: string;
  transmission: string;
  fuelType: string;
  seats: number;
  pricePerDay: number;
};

const ManageCarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data.car || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this car?");
    if (!confirmDelete) return;

    try {
      await deleteCar(id);
      alert("Car deleted successfully");
      fetchCars();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete car");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Cars</h1>
          <p className="text-gray-500 mt-1">View and manage all cars</p>
        </div>
        <Link
          to="/admin/create"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Car
        </Link>
      </div>

      {loading && <p>Loading cars...</p>}

      {!loading && cars.length === 0 && (
        <p className="text-center py-10">No cars found</p>
      )}

      {!loading && cars.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Fuel</th>
                <th className="p-3 text-left">Seats</th>
                <th className="p-3 text-left">Gear</th>
                <th className="p-3 text-left">Price / Day</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-16 h-12 object-cover rounded bg-gray-100"
                    />
                  </td>
                  <td className="p-3 font-medium">{car.name}</td>
                  <td className="p-3">{car.brand}</td>
                  <td className="p-3 capitalize">{car.fuelType}</td>
                  <td className="p-3">{car.seats}</td>
                  <td className="p-3 capitalize">{car.transmission}</td>
                  <td className="p-3">₦{car.pricePerDay.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-car/${car._id}`}
                        className="px-3 py-1 border rounded hover:bg-gray-50 text-sm transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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

export default ManageCarsPage;