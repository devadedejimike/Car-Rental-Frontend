import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCar } from "../api/cars";
import { updateCar } from "../api/admin";
import BackButton from "../assets/BackButton";

const EditCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    image: "",
    transmission: "",
    fuelType: "",
    seats: "",
    description: "",
    available: true,
  });

  // FETCH CAR
  const fetchCar = async () => {
    try {
      setLoading(true);

      const data = await getSingleCar(id as string);
      const car = data.car;

      setFormData({
        name: car.name || "",
        brand: car.brand || "",
        pricePerDay: car.pricePerDay?.toString() || "",
        image: car.image || "",
        transmission: car.transmission || "",
        fuelType: car.fuelType || "",
        seats: car.seats?.toString() || "",
        description: car.description || "",
        available: car.available ?? true,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to fetch car");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUpdating(true);

      await updateCar(id as string, {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        seats: Number(formData.seats),
      });

      alert("Car updated successfully");
      navigate("/admin/cars");
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to update car");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl">
        <BackButton />
      <h1 className="text-3xl font-bold mb-6">Edit Car</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Car Name"
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Brand"
        />

        <input
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Price"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Image URL"
        />

        <input
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Transmission"
        />

        <input
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Fuel Type"
        />

        <input
          name="seats"
          type="number"
          value={formData.seats}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          placeholder="Seats"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows={4}
          placeholder="Description"
        />

        {/* ✅ AVAILABLE FIX */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>

        <button
          type="submit"
          disabled={updating}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {updating ? "Updating..." : "Update Car"}
        </button>
      </form>
    </div>
  );
};

export default EditCarPage;