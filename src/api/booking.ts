import API from "./client";

export const createBooking = async (bookingData: {
  carId: string;
  startDate: string;
  endDate: string;
}) => {
  const res = await API.post(
    "/user/booking",
    bookingData
  );

  return res.data;
};

export const getUserBookings = async () => {
  const res = await API.get("/user/booking");

  return res.data;
};

export const cancelBooking = async (
  id: string
) => {
  const res = await API.patch(
    `/user/booking/${id}/cancel`
  );

  return res.data;
};