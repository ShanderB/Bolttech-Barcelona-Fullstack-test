import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import SuccessPage from './pages/Success/Success';
import { ThemeProvider } from './shared/ThemeContext';

const App = () => (
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  </ThemeProvider>

);

export default App;