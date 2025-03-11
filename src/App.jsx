import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Helmet } from 'react-helmet';
import AdminLogin from './components/AdminLogin';
import NewNavbar from './components/NewNavbar';
import Footer from './components/Footer';
import { navigationIcons } from './components/Icons';
import logo from './assets/logo.svg';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Birthday from './pages/Birthday';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Games from './pages/Games';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Menü', href: '/menu' },
  { name: 'Galeri', href: '/gallery' },
  { name: 'Oyunlar', href: '/games' },
  { name: 'Rezervasyon', href: '/reservation' },
  { name: 'İletişim', href: '/contact' }
].map(item => ({
  ...item,
  icon: navigationIcons[item.name]
}));

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <AdminLogin />;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen">
      <Helmet>
        <title>Mio Boon's</title>
        <link rel="icon" href={logo} type="image/svg+xml" />
      </Helmet>
      <NewNavbar />
      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/games" element={<Games />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
