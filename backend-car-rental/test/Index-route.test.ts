import request from 'supertest';
import app from '../src/app';
import { getCars } from '../src/controllers/Cars-controller';
import { createBooking } from '../src/controllers/Booking-controller';

jest.mock('../src/controllers/Cars-controller', () => ({
    getCars: jest.fn((req, res) => res.status(200).json({ message: 'Mocked getCars' })),
}));

jest.mock('../src/controllers/Booking-controller', () => ({
    createBooking: jest.fn((req, res) => res.status(201).json({ message: 'Mocked createBooking' })),
}));

describe('Routes', () => {
    it('should return 200 for the health check route', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'OK' });
    });

    it('should call the getCars controller for the /cars route', async () => {
        const response = await request(app).get('/api/cars');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Mocked getCars' });
    });

    it('should call the createBooking controller for the /bookings route', async () => {
        const response = await request(app)
            .post('/api/bookings')
            .send({
                carId: '1',
                userId: '123',
                startDate: '2025-06-01',
                endDate: '2025-06-10',
                licenseValid: true,
            });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Mocked createBooking' });
    });
});