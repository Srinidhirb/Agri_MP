import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';
import WeatherApp from './pages/WeatherApp';
import HomePage from './pages/Home';
import Demo from './pages/demo'
import SoilCrop from './pages/SoilCrop';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes using the new syntax */}
          <Route path="/" element={<HomePage />} />  {/* HomePage route */}
          <Route path="/weather" element={<WeatherApp />} />  {/* WeatherApp route */}
          <Route path="/soilcrop" element={<SoilCrop/>} />  {/* AboutPage route */}
          <Route path="/Demo" element={<Demo/>} />  {/* AboutPage route */}
          <Route path="/services" element={<Services/>} />  {/* AboutPage route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
