import { Router } from 'express';
import { getCars } from '../controllers/cars-controller';
import { createBooking } from '../controllers/booking-controller';

const router = Router();


router.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

router.get('/cars', getCars);
router.post('/bookings', createBooking);

export default router;