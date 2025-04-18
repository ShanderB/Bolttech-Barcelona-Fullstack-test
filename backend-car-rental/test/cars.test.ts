import request from 'supertest';
import Car from '../src/models/car-model';
import Booking from '../src/models/book-model';
import app from '../src/app';

jest.mock('../src/models/car-model', () => ({
    find: jest.fn(),
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
                stock: 3,
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
                stock: 3,
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
                stock: 0,
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
});