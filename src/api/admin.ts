import API from "./client";

// CREATE CAR
export const createCar = async (
  carData: any
) => {
  const res = await API.post(
    "/admin/create",
    carData
  );

  return res.data;
};

// GET ALL BOOKINGS
export const getAllBookings =
  async () => {
    const res = await API.get(
      "/admin/booking"
    );

    return res.data;
  };

// APPROVE BOOKING
export const approveBooking =
  async (id: string) => {
    const res = await API.patch(
      `/admin/booking/${id}/approve`
    );

    return res.data;
  };

// CANCEL BOOKING
export const cancelBookingAdmin =
  async (id: string) => {
    const res = await API.patch(
      `/admin/booking/${id}/cancel`
    );

    return res.data;
  };

// DELETE CAR
export const deleteCar = async (
  id: string
) => {
  const res = await API.delete(
    `/admin/cars/${id}`
  );

  return res.data;
};

// UPDATE CAR
export const updateCar = async (
  id: string,
  data: any
) => {
  const res = await API.patch(
    `/admin/cars/${id}`,
    data
  );

  return res.data;
};
// GET ALL CARS
export const getAdminCars =
  async () => {
    const res = await API.get(
      "/admin/cars"
    );

    return res.data;
};