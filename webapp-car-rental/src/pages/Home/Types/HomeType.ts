export interface Car {
    _id: number;
    brand: string;
    model: string;
    price: number;
    stock: boolean;
    totalPrice: number;
}

export interface HomePageState {
    cars: Car[];
    startDate: string;
    endDate: string;
    selectedCar: Car | null;
    isModalOpen: boolean;
}