// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';
import Settings from './pages/Settings';

function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:cityName" element={<CityDetails />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      {/* <test/> */}
    </div>
  );
}

export default App;