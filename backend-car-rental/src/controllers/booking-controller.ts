export const createBooking = async (req: any, res: any) => {
    const { carId, userId, startDate, endDate, licenseValid } = req.body;
    res.status(201).json({ message: 'Booking created' });
  };