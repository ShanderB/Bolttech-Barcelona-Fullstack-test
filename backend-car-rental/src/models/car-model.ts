import { Schema, model } from 'mongoose';

const carSchema = new Schema({
  brand: String,
  model: String,
  stock: Number,
  prices: {
    peak: Number,
    mid: Number,
    off: Number,
  },
});

export default model('Car', carSchema);