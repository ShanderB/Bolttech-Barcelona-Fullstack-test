import { useState } from 'react';
import BookingPage from '../Booking/Booking';
import { useTheme } from '../../shared/ThemeContext';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Switch,
} from '@mui/material';
import { fetchCars } from '../../services/car-service';

interface Car {
  _id: number;
  brand: string;
  model: string;
  price: number;
  stock: boolean;
  totalPrice: number;
}

const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [startDate, setStartDate] = useState('2025-04-01');
  const [endDate, setEndDate] = useState('2025-04-10');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleFetchCars = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const carsData = await fetchCars(startDate, endDate);
    setCars(carsData);
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: isDarkMode ? '#121212' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
      <Typography variant="h4" gutterBottom style={{
        color: isDarkMode ? '#333' : '#000',
      }}>
        Available Cars
      </Typography>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{
            marginRight: '10px',
            backgroundColor: isDarkMode ? '#333' : '#fff',
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={{
            backgroundColor: isDarkMode ? '#333' : '#fff',
          }}
        />
        <Button variant="contained" color="primary" onClick={handleFetchCars} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </div>
      <TableContainer component={Paper} style={{ backgroundColor: isDarkMode ? '#333' : '#fff' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: 'none' }}>Brand</TableCell>
              <TableCell style={{ borderBottom: 'none' }}>Model</TableCell>
              <TableCell style={{ borderBottom: 'none' }}>Price</TableCell>
              <TableCell style={{ borderBottom: 'none' }}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow
                key={car._id}
                onClick={() => car.stock ? handleCarClick(car) : undefined}
                style={{
                  cursor: car.stock ? 'pointer' : 'not-allowed',
                  backgroundColor: car.stock ? (isDarkMode ? '#444' : '#f5f5f5') : '#333',
                  color: isDarkMode ? '#fff' : '#000',
                }}
                onMouseEnter={(e) => {
                  if (car.stock) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#555' : '#e0e0e0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (car.stock) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#444' : '#f5f5f5';
                  }
                }}
              >
                <TableCell style={{ borderBottom: 'none' }}>{car.brand}</TableCell>
                <TableCell style={{ borderBottom: 'none' }}>{car.model}</TableCell>
                <TableCell style={{ borderBottom: 'none' }}>${car.price}</TableCell>
                <TableCell style={{ borderBottom: 'none' }}>${car.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && selectedCar && (
        <BookingPage
          car={selectedCar}
          startDate={startDate}
          endDate={endDate}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage;