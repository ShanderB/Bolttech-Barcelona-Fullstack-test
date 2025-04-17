import Car from '../models/car-model';

export const getCars = async (req: any, res: any) => {
  const { startDate, endDate } = req.query;
  res.json([]);
};