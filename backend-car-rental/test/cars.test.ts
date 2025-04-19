import request from 'supertest';
import Car from '../src/models/Car-model';
import Booking from '../src/models/Book-model';
import app from '../src/app';
import { decrementCarStock } from '../src/controllers/Cars-controller';

jest.mock('../src/models/car-model', () => ({
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
}));

jest.mock('../src/models/book-model', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
}));

describe('GET /api/cars', () => {
    it('should return available cars with calculated prices', async () => {
        const mockCars = [
            {
                _id: '1',
                brand: 'Toyota',
                model: 'Yaris',
                stock: 3,
                prices: { peak: 98.43, mid: 76.89, off: 53.65 },
            },
        ];

        const mockBookings = [
            {
                carId: '2',
                startDate: new Date('2025-06-01'),
                endDate: new Date('2025-06-10'),
            },
        ];

        (Car.find as jest.Mock).mockResolvedValue(mockCars);
        (Booking.find as jest.Mock).mockResolvedValue(mockBookings);

        const response = await request(app).get('/api/cars?startDate=2025-06-01&endDate=2025-06-10');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                _id: '1',
                brand: 'Toyota',
                model: 'Yaris',
                stock: true,
                totalPrice: 984.3,
                price: 98.43,
            },
        ]);
    });

    it('should return 400 if startDate or endDate is missing', async () => {
        const response = await request(app).get('/api/cars');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Start date and end date are required' });
    });

    it('should return 200 if startDate and endDate are the same day', async () => {
        const response = await request(app).get('/api/cars?startDate=2025-06-01&endDate=2025-06-01');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                _id: '1',
                brand: 'Toyota',
                model: 'Yaris',
                stock: true,
                totalPrice: 98.43,
                price: 98.43,
            },
        ]);
    });

    it('should return 200 if a car is out of stock', async () => {
        const mockCars = [
            {
                _id: '1',
                brand: 'Toyota',
                model: 'Yaris',
                stock: false,
                price: 98.43,
            },
        ];

        (Car.find as jest.Mock).mockResolvedValue(mockCars);

        const response = await request(app).get('/api/cars?startDate=2025-06-01&endDate=2025-06-10');
        expect(response.status).toBe(200);
    });

    it('should return 400 if startDate is greater than endDate', async () => {
        const response = await request(app).get('/api/cars?startDate=2025-06-10&endDate=2025-06-01');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Start date cannot be greater than end date' });
    });

    it('should return 404 if no cars are found', async () => {
        (Car.find as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/api/cars?startDate=2025-06-01&endDate=2025-06-10');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'No cars found' });
    });

    it('should return 400 if startDate or endDate is missing', async () => {
        const response = await request(app).get('/api/cars');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Start date and end date are required' });
    });

    it('should return 400 if startDate is greater than endDate', async () => {
        const response = await request(app).get('/api/cars?startDate=2025-06-10&endDate=2025-06-01');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Start date cannot be greater than end date' });
    });
});

describe('decrementCarStock', () => {
    it('should decrement the stock of a car if available', async () => {
        const mockCar = {
            _id: '1',
            brand: 'Toyota',
            model: 'Yaris',
            stock: 3,
        };

        (Car.findOneAndUpdate as jest.Mock).mockResolvedValue({
            ...mockCar,
            stock: 2,
        });

        (Car.find as jest.Mock).mockResolvedValue([
            {
                ...mockCar,
                stock: 2,
            },
        ]);

        const result = await decrementCarStock('1');
        expect(result).not.toBe('Car not found or not available');

        const updatedCar = await Car.find({ _id: '1' });
        console.log(updatedCar[0].stock)
        expect(updatedCar[0].stock).toBe(2);
    });

    it('should return an error message if the car is not found', async () => {
        (Car.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

        const result = await decrementCarStock('1');
        expect(result).toBe('Car not found or not available');
    });
});