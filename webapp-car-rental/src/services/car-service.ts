import apiClient from "./api-client";

export const fetchCars = async (startDate: string, endDate: string) => {
    const response = await apiClient.get(`/cars?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};