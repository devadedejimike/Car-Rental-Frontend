import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../api/admin";
import BackButton from "../assets/BackButton";

const CreateCarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    seats: 4,
    transmission: "automatic", // Default
    fuelType: "petrol",        // Default 
    description: "",
    available: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, available: e.target.checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload a vehicle image");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("pricePerDay", formData.pricePerDay);
      data.append("transmission", formData.transmission);
      data.append("fuelType", formData.fuelType);
      data.append("seats", formData.seats.toString());
      data.append("available", formData.available.toString());
      data.append("description", formData.description);
      data.append("image", imageFile); 

      await createCar(data);
      alert("Car created successfully with all required fields!");
      navigate("/admin/cars");
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error?.response?.data?.message || "Failed to create car profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <BackButton />
        <h1 className="text-3xl font-bold">Add New Car</h1>
        <p className="text-gray-500">All fields are required by the backend data validator.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Car Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 bg-white focus:outline-none focus:ring-1 focus:ring-black capitalize"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 bg-white focus:outline-none focus:ring-1 focus:ring-black capitalize"
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Seats</label>
            <input
              type="number"
              name="seats"
              required
              min={1}
              value={formData.seats}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price Per Day (₦)</label>
            <input
              type="number"
              name="pricePerDay"
              required
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full border p-2.5 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Vehicle Image (File Upload)</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="w-full border p-2 rounded-lg mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleCheckboxChange}
            className="w-4 h-4 accent-black cursor-pointer"
          />
          <label htmlFor="available" className="text-sm font-medium cursor-pointer select-none">
            Mark vehicle as immediately available for rent
          </label>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-black resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Uploading to Cloudinary & Saving..." : "Save Car Specifications"}
        </button>
      </form>
    </div>
  );
};

export default CreateCarPage;