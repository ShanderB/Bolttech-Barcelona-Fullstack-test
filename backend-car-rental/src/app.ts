import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));