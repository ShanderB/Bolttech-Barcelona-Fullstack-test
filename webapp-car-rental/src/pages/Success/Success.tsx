import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../shared/ThemeContext';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const car = location.state?.car;

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: isDarkMode ? '#121212' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      <Card style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
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
            style={{ marginTop: '20px' }}
          >
            Go Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;