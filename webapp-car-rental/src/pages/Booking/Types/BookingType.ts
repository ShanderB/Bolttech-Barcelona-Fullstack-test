export interface CarType {
    _id: number;
    brand: string;
    model: string;
    price: number;
    totalPrice: number;
}

export interface BookingPageProps {
    car: CarType;
    startDate: string;
    endDate: string;
    closeModal: () => void;
}

export interface BookingFormData {
    userId: string;
    licenseValid: boolean;
}

export interface BookingData {
    carId: number;
    userId: string;
    startDate: string;
    endDate: string;
    licenseValid: boolean;
}

export interface CarService {
    _id: number;
    brand: string;
    model: string;
    price: number;
    stock: boolean;
    totalPrice: number;
}
