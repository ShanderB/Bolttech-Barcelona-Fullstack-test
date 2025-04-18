import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api', routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental'/* , { useNewUrlParser: true, useUnifiedTopology: true } */)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
}

export default app;
