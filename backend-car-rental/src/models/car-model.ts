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
  carBase64: String,
  },
  {
    timestamps: true,
  }
);

export default model('Car', carSchema);