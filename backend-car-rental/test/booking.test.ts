import request from 'supertest';
import Car from '../src/models/car-model';
import Booking from '../src/models/book-model';

import app from '../src/app';

jest.mock('../src/models/car-model', () => ({
    find: jest.fn(),
    findById: jest.fn(),
}));

jest.mock('../src/models/book-model', () => {
  const BookingMock = jest.fn().mockImplementation(() => ({
    save: jest.fn(),

    // save: jest.fn(()=>({
    //   then: jest.fn(),
    //   catch: jest.fn(),
    // })),
  }));

  (BookingMock as any).findOne = jest.fn();
  (BookingMock as any).find = jest.fn();

  return {
    __esModule: true,
    default: BookingMock,
  };
});

describe('POST /api/bookings', () => {
  it('should create a booking if all validations pass', async () => {
    const mockCar = { _id: '1', stock: 3 };
    (Car.findById as jest.Mock).mockResolvedValue(mockCar);
    (Booking.findOne as jest.Mock).mockResolvedValue(null);

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
    expect(response.body).toEqual({ message: 'Booking created', booking: expect.any(Object) });
  });

  it('should return 400 if user already has a booking for the same dates', async () => {
    (Booking.findOne as jest.Mock).mockResolvedValue({});

    const response = await request(app)
      .post('/api/bookings')
      .send({
        carId: '1',
        userId: '123',
        startDate: '2025-06-01',
        endDate: '2025-06-10',
        licenseValid: true,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'User already has a booking for the selected dates' });
  });

  it('should return 400 if license is not valid', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        carId: '1',
        userId: '123',
        startDate: '2025-06-01',
        endDate: '2025-06-10',
        licenseValid: false,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Driving license must be valid' });
  });
});