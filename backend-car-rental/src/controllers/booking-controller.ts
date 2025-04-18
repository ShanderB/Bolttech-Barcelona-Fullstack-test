import Car from '../models/car-model';
import Booking from '../models/book-model';

export const createBooking = async (req: any, res: any) => {
  const { carId, userId, startDate, endDate, licenseValid } = req.body;

  if (!carId || !userId || !startDate || !endDate || licenseValid === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return res.status(400).json({ message: 'Start date must be before end date' });
  }

  if (!licenseValid) {
    return res.status(400).json({ message: 'Driving license must be valid' });
  }

  const existingBooking = await Booking.findOne({
    userId,
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } },
    ],
  });

  if (existingBooking) {
    return res.status(400).json({ message: 'User already has a booking for the selected dates' });
  }

  const car = await Car.findById(carId);
  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  const booking = new Booking({
    carId,
    userId,
    startDate,
    endDate,
    licenseValid,
  });

  await booking.save()
  // validate correctly with then and catch
  //remove car from stock
  //add error test
  res.status(201).json({ message: 'Booking created', booking });
  
};