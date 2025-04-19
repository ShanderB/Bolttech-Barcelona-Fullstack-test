import { calculateCarPrices, parseDatesAndSeason } from '../shared/Utils';
import Car from '../models/Car-model';
import { CarType } from '../types/Types';
import { Request, Response } from 'express';

export const getCars = async (req: Request, res: Response): Promise<Response> => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required' });
  } else if (startDate > endDate) {
    return res.status(400).json({ message: 'Start date cannot be greater than end date' });
  }

  const { start, end, season } = parseDatesAndSeason(startDate as string, endDate as string);

  const cars = await Car.find<CarType>();

  if (!cars || cars.length === 0) {
    return res.status(404).json({ message: 'No cars found' });
  }

  const carsWithPrices = calculateCarPrices(cars, season, start, end);

  return res.status(200).json(carsWithPrices);
};

export const decrementCarStock = async (carId: string): Promise<string | undefined> => {
  const updatedCar = await Car.findOneAndUpdate(
    { _id: carId, stock: { $gt: 0 } },
    { $inc: { stock: -1 } },
    { new: true }
  );

  if (!updatedCar) {
    return 'Car not found or not available';
  }
};