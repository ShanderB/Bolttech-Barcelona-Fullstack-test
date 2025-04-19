export interface Car {
    _id: number;
    brand: string;
    model: string;
    price: number;
    stock: boolean;
    totalPrice: number;
    carBase64: string;
}

export interface HomePageState {
    cars: Car[];
    startDate: string;
    endDate: string;
    selectedCar: Car | null;
    isModalOpen: boolean;
}

export enum HomeColors {
    DarkBackground = '#121212',
    LightBackground = '#fff',
    DarkText = '#fff',
    LightText = '#000',
    TitleDark = '#333',
    TitleLight = '#000',
}