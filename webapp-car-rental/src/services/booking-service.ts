import apiClient from "./api-client";

export const createBooking = async (bookingData: {
    carId: number;
    userId: string;
    startDate: string;
    endDate: string;
    licenseValid: boolean;
}) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
};