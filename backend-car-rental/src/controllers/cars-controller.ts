import Car from '../models/car-model';

export const getCars = async (req: any, res: any) => {
  const { startDate, endDate } = req.query;
  res.json([]);
};

export const createBooking = async (req: any, res: any) => {
  const { carId, userId, startDate, endDate, licenseValid } = req.body;
  res.status(201).json({ message: 'Booking created' });
};