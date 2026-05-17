import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    transmission: "automatic",
    fuelType: "petrol",
    seats: 4,
    description: "",
    available: true,
  });
  const [existingImage, setExistingImage] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (!id) return;
        const res = await getSingleCar(id);
        const car = res.car;
        
        setFormData({
          name: car.name,
          brand: car.brand,
          pricePerDay: car.pricePerDay.toString(),
          transmission: car.transmission || "automatic",
          fuelType: car.fuelType || "petrol",
          seats: car.seats,
          description: car.description,
          available: car.available !== undefined ? car.available : true,
        });
        setExistingImage(car.image);
      } catch (error) {
        console.error("Error reading mapping indices:", error);
        alert("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, available: e.target.checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      
      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("pricePerDay", formData.pricePerDay);
      data.append("transmission", formData.transmission);
      data.append("fuelType", formData.fuelType);
      data.append("seats", formData.seats.toString());
      data.append("available", formData.available.toString());
      data.append("description", formData.description);
      
      if (newImageFile) {
        data.append("image", newImageFile);
      }

      await updateCar(id as string, data);
      alert("Car updated successfully without schema validation errors!");
      navigate("/admin/cars");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to update record details");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Reading parameters summary...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <BackButton />
        <h1 className="text-3xl font-bold">Edit Car Details</h1>
        <p className="text-gray-500"></p>
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
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">No of Seats</label>
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

        <div className="space-y-2">
          <label className="text-sm font-medium block">Current Image Preview</label>
          {existingImage && !newImageFile && (
            <img src={existingImage} alt="Current entry preview" className="w-32 h-20 object-cover rounded border bg-gray-50" />
          )}
          <input
            type="file"
            accept="image/*"
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
            Vehicle is available for hire
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

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/cars")}
            className="w-1/2 border py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="w-1/2 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {updating ? "Saving Changes..." : "Apply Updates"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarPage;