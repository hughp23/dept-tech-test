import axios from "axios";

const BASE_URL = "https://api.openaq.org/v1";

export const getCities = async () => {
  const { data } = await axios.get(`${BASE_URL}/cities?limit=10000&country=GB`);
  return data;
};

export const getCityData = async city => {
  const { data } = await axios.get(`${BASE_URL}/latest?city=${city}`);
  return data;
};
