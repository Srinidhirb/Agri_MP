import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import { UserProvider } from './pages/UserContext'; // Import UserContext for managing user state
import './App.css';
import WeatherApp from './pages/WeatherApp';
import HomePage from './pages/Home';
import SoilCrop from './pages/SoilCrop';
import Services from './pages/Services';
import Plant from './pages/Plant';
import Education from './pages/Education';
import AboutSection from './pages/AboutSection';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar'; // Import your NavBar
import ProfilePage from './pages/ProfilePage';
import LanguageSelector from './components/LanguageSelector';
// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Provide the QueryClient to the app */}
      <UserProvider>
        <Router>
          {/* Include NavBar here */}
          
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/soilcrop" element={<SoilCrop />} />
            <Route path="/services" element={<Services />} />
            <Route path="/plant" element={<Plant />} />
            <Route path="/education" element={<Education />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* Profile route */}
            {/* Login and Register Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lang" element={<LanguageSelector />} />
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
