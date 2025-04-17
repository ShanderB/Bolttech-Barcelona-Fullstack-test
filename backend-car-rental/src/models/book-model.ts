import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: 'Car' },
  userId: String,
  startDate: Date,
  endDate: Date,
  licenseValid: Boolean,
});

export default model('Booking', bookingSchema);