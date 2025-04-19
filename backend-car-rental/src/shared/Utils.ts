import { CarType, CarWithPrices, SeasonEnum } from "../types/Types";

export const calculateCarPrices = (
    cars: CarType[],
    season: SeasonEnum,
    start: Date,
    end: Date
): CarWithPrices[] => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // Calculate total days

    return cars.map((car) => {
        const dailyPrice = car.prices?.[season] ?? 0;
        const totalPrice = parseFloat((dailyPrice * days).toFixed(2)); // Calculate total price for the rental period

        return {
            _id: car._id,
            brand: car.brand,
            model: car.model,
            stock: car.stock! > 0 ? true : false,
            price: dailyPrice,
            totalPrice,
            carBase64: car.carBase64,
        };
    });
};

export const getSeason = (date: Date): SeasonEnum => {
    //could use moment.js or date-fns for better date handling
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if ((month === 6 && day >= 1) || (month === 9 && day <= 15) || (month > 6 && month < 9)) {
        return SeasonEnum.PEAK;
    } else if ((month === 9 && day > 15) || (month === 10) || (month === 3) || (month === 5) || (month === 4)) {
        return SeasonEnum.MID;
    } else {
        return SeasonEnum.OFF;
    }
};

export const parseDatesAndSeason = (startDate: string, endDate: string): { start: Date; end: Date; season: SeasonEnum } => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        throw new Error('Start date cannot be greater than end date');
    }

    const season = getSeason(start);
    return { start, end, season };
};