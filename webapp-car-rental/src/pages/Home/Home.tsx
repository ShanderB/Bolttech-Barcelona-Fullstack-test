import { useState } from 'react';
import axios from 'axios';
import './home.css'; // Arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleBooking = () => {
    closeModal();
    navigate('/success', { state: { car: selectedCar } });
  };

  const fetchCars = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    axios
      .get(`http://localhost:5000/api/cars?startDate=${startDate}&endDate=${endDate}`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
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
            <tr key={car._id} onClick={() => openModal(car)}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>{car.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Car Details</h2>
            <p><strong>Brand:</strong> {selectedCar.brand}</p>
            <p><strong>Model:</strong> {selectedCar.model}</p>
            <p><strong>Price per day:</strong> ${selectedCar.price}</p>
            <p><strong>Total Price:</strong> ${selectedCar.totalPrice}</p>
            <button className="booking-button" onClick={handleBooking}>Confirm Booking</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;