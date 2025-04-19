import { BookingData } from "../pages/Booking/Types/BookingType";
import apiClient from "./api-client";

export const createBooking = async (bookingData: BookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
};