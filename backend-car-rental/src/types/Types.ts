export interface CarType {
    _id?: string;
    brand: string;
    model: string;
    stock: number;
    prices: {
        peak: number;
        mid: number;
        off: number;
    };
    carBase64: string; 
}

export interface BookingType {
    carId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    licenseValid: boolean;
}

export interface CarWithPrices extends Omit<CarType, 'stock' | 'prices' | 'carBase64'> {
    price: number;
    totalPrice: number;
    stock: boolean;
}

export enum SeasonEnum {
    PEAK = 'peak',
    MID = 'mid',
    OFF = 'off'
}