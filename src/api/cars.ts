import API from "./client";

export const getCars = async () => {
  const res = await API.get("/user/cars");
  return res.data;
};

export const getSingleCar = async (id: string) => {
  const res = await API.get(`/user/cars/${id}`);
  return res.data;
};