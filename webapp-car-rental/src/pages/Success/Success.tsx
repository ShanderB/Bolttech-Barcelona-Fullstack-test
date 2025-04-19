import './success.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/ThemeContext';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const car = location.state?.car;

    return (
        <div className={`success-container ${isDarkMode ? 'dark' : ''}`}>
            <h1>Booking Confirmed!</h1>
            {car ? (
                <div className="car-details">
                    <p><strong>Brand:</strong> {car.brand}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Price per day:</strong> ${car.price}</p>
                    <p><strong>Total Price:</strong> ${car.totalPrice}</p>
                </div>
            ) : (
                <p>No car details available.</p>
            )}
            <button className="home-button" onClick={() => navigate('/')}>
                Go Back to Home
            </button>
        </div>
    );
};

export default SuccessPage;