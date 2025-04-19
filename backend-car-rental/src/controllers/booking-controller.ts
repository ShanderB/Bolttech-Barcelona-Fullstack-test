import Booking from '../models/Book-model';
import { decrementCarStock } from './Cars-controller';
import { Request, Response } from 'express';

export const createBooking = async (req: Request, res: Response): Promise<Response> => {
  const { carId, userId, startDate, endDate, licenseValid } = req.body;

  if (!carId || !userId || !startDate || !endDate || licenseValid === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  //TODO add function to validate everything and add error messages

  if (start >= end) {
    return res.status(400).json({ message: 'Start date must be before end date' });
  }

  if (!licenseValid) {
    return res.status(400).json({ message: 'Driving license must be valid' });
  }

  const existingBooking = await Booking.findOne({
    userId,
    $or: [
      //TODO if data overlaps, return error
      { startDate: { $lte: end }, endDate: { $gte: start } },
    ],
  });

  if (existingBooking) {
    return res.status(400).json({ message: 'User already has a booking for the selected dates' });
  }

  // const session = await mongoose.startSession();
  // session.startTransaction();

  const booking = new Booking({
    carId,
    userId,
    startDate,
    endDate,
    licenseValid,
  });

  //TODO try to fix transaciton
  // await booking.save({ session }).then(async () => {
  //   car.stock! -= 1;
  //   await car.save({ session }).then(async () => {
  //     await session.commitTransaction();
  //     session.endSession();
  //   })
  // }).catch(async (error) => {
  //   console.log('Error saving booking:', error);  
  //   await session.abortTransaction();
  //   session.endSession();
  // });

  await booking.save();
  const decrementErrorMessage = await decrementCarStock(carId);

  if (decrementErrorMessage) {
    return res.status(400).json({ message: decrementErrorMessage });
  }

  return res.status(201).json({ message: 'Booking created' });
};