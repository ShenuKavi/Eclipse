// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import MoodTracker from './Pages/MoodTracker';
import Journal from './Pages/Journal';
import LightMoments from './Pages/LightMoments';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/light-moments" element={<LightMoments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
