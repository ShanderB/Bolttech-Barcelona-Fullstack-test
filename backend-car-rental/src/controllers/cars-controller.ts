import Car from '../models/car-model';
import { calculateCarPrices, getSeason } from '../shared/Utils';

export const getCars = async (req: any, res: any) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const season = getSeason(start);

  if (start > end) {
    return res.status(400).json({ message: 'Start date cannot be greater than end date' });
  }

  //TODO trycatch
  const cars = await Car.find();

  if (!cars) {
    return res.status(404).json({ message: 'No cars found' });
  }

  const carsWithPrices = calculateCarPrices(cars, season, start, end);

  //TODO add error test
  //TODO add status and validation 
  //TODO add DTO
  res.json(carsWithPrices);
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