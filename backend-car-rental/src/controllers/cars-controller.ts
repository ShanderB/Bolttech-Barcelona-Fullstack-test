import { calculateCarPrices, getSeason, parseDatesAndSeason } from '../shared/Utils';
import Car from '../models/Car-model';

export const getCars = async (req: any, res: any) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required' });
  } else if (startDate > endDate) {
    return res.status(400).json({ message: 'Start date cannot be greater than end date' });
  }

  const { start, end, season } = parseDatesAndSeason(startDate, endDate);

  const cars = await Car.find();
  //todo lean

  if (!cars || cars.length === 0) {
    return res.status(404).json({ message: 'No cars found' });
  }

  const carsWithPrices = calculateCarPrices(cars, season, start, end);

  res.status(200).json(carsWithPrices);
};

export const decrementCarStock = async (carId: string) => {
  const updatedCar = await Car.findOneAndUpdate(
    { _id: carId, stock: { $gt: 0 } },
    { $inc: { stock: -1 } },
    { new: true }
  );

  if (!updatedCar) {
    return 'Car not found or not available';
  }
};