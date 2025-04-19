import './home.css'
import { useState } from 'react';
import BookingPage from '../Booking/Booking';
import { useTheme } from '../../shared/ThemeContext';
import { Typography } from '@mui/material';
import { fetchCars } from '../../services/car-service';
import { Car, HomeColors } from './Types/HomeType';
import CustomButton from '../../components/Button/CustomButton';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import CustomTable from '../../components/Table/CustomTable';
import { Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-02');
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
    <div
      className="home-container"
      style={{
        backgroundColor: isDarkMode ? HomeColors.DarkBackground : HomeColors.LightBackground,
        color: isDarkMode ? HomeColors.DarkText : HomeColors.LightText,
      }}
    >
      <div className="home-header">
        <Typography variant="h4" gutterBottom className="home-title">
          Available Cars
        </Typography>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </div>
      </div>

      <div className="date-picker-container">
        <CustomDatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          isDarkMode={isDarkMode}
        />
        <CustomDatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          isDarkMode={isDarkMode}
        />
      </div>
      <CustomButton label="Search" onClick={handleFetchCars} />
      <CustomTable
        data={cars}
        columns={[
          { key: 'brand', label: 'Brand' },
          { key: 'model', label: 'Model' },
          { key: 'price', label: 'Price' },
          { key: 'totalPrice', label: 'Total Price' },
        ]}
        onRowClick={(car) => car.stock && handleCarClick(car)}
        isDarkMode={isDarkMode}
      />

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