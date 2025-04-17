import { Router } from 'express';
import { getCars, createBooking } from '../controllers/cars-controller';

const router = Router();


router.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});


export default router;