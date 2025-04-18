import Car from '../models/car-model';
import Booking from '../models/book-model';

const getSeason = (date: Date) => {
  //could use moment.js or date-fns for better date handling
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 6 && day >= 1) || (month === 9 && day <= 15) || (month > 6 && month < 9)) {
    return 'peak';
  } else if ((month === 9 && day > 15) || (month === 10) || (month === 3) || (month === 5) || (month === 4)) {
    return 'mid';
  } else {
    return 'off';
  }
};

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

  const bookings = await Booking.find({
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } },
    ],
  });

  if (!bookings) {
    return res.status(404).json({ message: 'No bookings found' });
  }

  const bookedCarIds = bookings
  .filter((booking) => booking.carId !== null && booking.carId !== undefined)
  .map((booking) => booking.carId!.toString());

  const availableCars = cars.filter((car) => !bookedCarIds.includes(car._id.toString()));

  const carsWithPrices = availableCars.map((car) => {
    // [start date, end date] or ]start date, end date]?
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dailyPrice = car.prices?.[season] ?? 0;
    const totalPrice = parseFloat((dailyPrice * days).toFixed(2));

    return {
      ...car,
      dailyPrice,
      totalPrice,
    };
  });

  //add error test
  //add status and validation 

  res.json(carsWithPrices);
};