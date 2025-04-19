import Booking from '../models/book-model';
import { decrementCarStock } from './cars-controller';

export const createBooking = async (req: any, res: any) => {
  const { carId, userId, startDate, endDate, licenseValid } = req.body;

  if (!carId || !userId || !startDate || !endDate || licenseValid === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  //adicionar função para validar tudo e ir adicionando mensagens de erro.

  if (start >= end) {
    return res.status(400).json({ message: 'Start date must be before end date' });
  }

  if (!licenseValid) {
    return res.status(400).json({ message: 'Driving license must be valid' });
  }

  const existingBooking = await Booking.findOne({
    userId,
    $or: [
      // if data overlaps, return error
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
  const decrementErrorMessage =  await decrementCarStock(carId);

  if(decrementErrorMessage) {
    return res.status(400).json({ message: decrementErrorMessage });
  }

  res.status(201).json({ message: 'Booking created', booking });

};