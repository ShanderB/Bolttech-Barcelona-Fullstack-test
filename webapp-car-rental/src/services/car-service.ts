import { Car } from "../pages/Home/Types/HomeType";
import apiClient from "./api-client";

export const fetchCars = async (startDate: string, endDate: string): Promise<Car[]> => {
    const response = await apiClient.get(`/cars?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};