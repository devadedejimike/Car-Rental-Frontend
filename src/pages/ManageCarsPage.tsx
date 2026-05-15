import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCar} from "../api/admin";
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
      console.log(error);
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

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Cars</h1>
          <p className="text-gray-500 mt-1">View and manage all cars</p>
        </div>

        <Link
          to="/admin/create"
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Add Car
        </Link>
      </div>

      {/* LOADING */}
      {loading && <p>Loading cars...</p>}

      {/* EMPTY */}
      {!loading && cars.length === 0 && (
        <p className="text-center py-10">No cars found</p>
      )}

      {/* TABLE */}
      {!loading && cars.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Fuel</th>
                <th className="p-3 text-left">Seats</th>
                <th className="p-3 text-left">Gear</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t">

                  <td className="p-3">
                    <img
                      src={car.image}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{car.name}</td>
                  <td className="p-3">{car.brand}</td>
                  <td className="p-3">{car.fuelType}</td>
                  <td className="p-3">{car.seats}</td>
                  <td className="p-3">{car.transmission}</td>
                  <td className="p-3">₦{car.pricePerDay}</td>

                  <td className="p-3 flex gap-2">
                    <Link
                      to={`/admin/edit-car/${car._id}`}
                      className="px-3 py-1 border rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
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