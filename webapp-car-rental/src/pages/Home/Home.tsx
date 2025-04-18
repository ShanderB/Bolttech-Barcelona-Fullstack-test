import { useState } from 'react';
import axios from 'axios';
import './home.css';
import BookingPage from '../Booking/Booking';

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

  const fetchCars = () => {
    //todo add css for the button
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    axios
      .get(`http://localhost:5000/api/cars?startDate=${startDate}&endDate=${endDate}`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
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
    <div className="home-container">
      <h1>Available Cars</h1>
      <div className="filters">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate || '2025-04-01'}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate || '2025-04-10'}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
        <button className="search-button" onClick={fetchCars}>Search</button>
      </div>
      <table className="cars-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}
            onClick={() => car.stock ? handleCarClick(car) : undefined}
            className={!car.stock ? 'out-of-stock' : ''}
            >
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>{car.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

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