import { useState } from "react";
import { createCar } from "../api/admin";
import BackButton from "../assets/BackButton";

const CreateCarPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    image: "",
    transmission: "",
    fuelType: "",
    seats: "",
    description: "",
    available: true, // ✅ FIXED
  });

  const [loading, setLoading] = useState(false);

  // HANDLE CHANGE (FIXED FOR BOOLEAN)
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
      setLoading(true);

      await createCar({
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        seats: Number(formData.seats),
      });

      alert("Car created successfully");

      // RESET FORM
      setFormData({
        name: "",
        brand: "",
        pricePerDay: "",
        image: "",
        transmission: "",
        fuelType: "",
        seats: "",
        description: "",
        available: true, // ✅ reset properly
      });
    } catch (error: any) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create car"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold">Create Car</h1>
        <p className="text-gray-500 mt-1">
          Add a new car to the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Price Per Day"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          placeholder="Transmission"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          placeholder="Fuel Type"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="seats"
          type="number"
          value={formData.seats}
          onChange={handleChange}
          placeholder="Seats"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={5}
          className="w-full border p-3 rounded-lg"
        />

        {/* ✅ AVAILABLE FIELD */}
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
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Car"}
        </button>
      </form>
    </div>
  );
};

export default CreateCarPage;