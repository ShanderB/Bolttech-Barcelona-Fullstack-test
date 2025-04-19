import './success.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/ThemeContext';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const car = location.state?.car;

    return (
        <div className={`success-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <Card className={`success-card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Booking Confirmed!
                    </Typography>
                    {car ? (
                        <div>
                            <Typography><strong>Brand:</strong> {car.brand}</Typography>
                            <Typography><strong>Model:</strong> {car.model}</Typography>
                            <Typography><strong>Price per day:</strong> ${car.price}</Typography>
                            <Typography><strong>Total Price:</strong> ${car.totalPrice}</Typography>
                        </div>
                    ) : (
                        <Typography>No car details available.</Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        className="success-button"
                    >
                        Go Back to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuccessPage;