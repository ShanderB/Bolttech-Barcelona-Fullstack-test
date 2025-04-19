import mongoose from 'mongoose';
import Car from './models/Car-model';
import { CarType } from './types/Types';

const seedCars = async (): Promise<void> => {
  const cars: CarType[] = [
    {
      brand: 'Toyota',
      model: 'Yaris',
      stock: 3,
      prices: { peak: 98.43, mid: 76.89, off: 53.65 },
    },
    {
      brand: 'Seat',
      model: 'Ibiza',
      stock: 5,
      prices: { peak: 85.12, mid: 65.73, off: 46.85 },
    },
    {
      brand: 'Nissan',
      model: 'Qashqai',
      stock: 2,
      prices: { peak: 101.46, mid: 82.94, off: 59.87 },
    },
    {
      brand: 'Jaguar',
      model: 'e-pace',
      stock: 1,
      prices: { peak: 120.54, mid: 91.35, off: 70.27 },
    },
    {
      brand: 'Mercedes',
      model: 'Vito',
      stock: 2,
      prices: { peak: 109.16, mid: 89.64, off: 64.97 },
    },
  ];

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental');
    console.log('Connected to MongoDB');

    await Car.deleteMany({});
    console.log('Cleared existing car data');

    await Car.insertMany(cars);
    console.log('Seeded car data successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedCars();