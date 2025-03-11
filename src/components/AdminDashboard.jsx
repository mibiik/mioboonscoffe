import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getReservations, updateReservationStatus, deleteReservation } from '../utils/reservationService';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0
  });

  // Load reservations on component mount
  useEffect(() => {
    loadReservations();
    
    // Set up automatic refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      loadReservations();
    }, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Update statistics whenever reservations change
    const newStats = {
      total: reservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length
    };
    setStats(newStats);
  }, [reservations]);

  const loadReservations = () => {
    try {
      const data = getReservations();
      // Sort reservations by date in descending order
      const sortedReservations = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReservations(sortedReservations);
    } catch (err) {
      setError('Failed to load reservations');
    }
  };

  const filteredReservations = reservations
    .filter(res => {
      const matchesFilter = filter === 'all' || res.status === filter;
      const matchesSearch = searchTerm === '' ||
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.phone.includes(searchTerm) ||
        res.date.includes(searchTerm);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleStatusChange = async (id, status) => {
    try {
      await updateReservationStatus(id, status);
      loadReservations();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu rezervasyonu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteReservation(id);
        loadReservations();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto p-6"
    >
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Toplam</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-600">Bekleyen</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-600">Onaylanan</h3>
          <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-red-600">İptal Edilen</h3>
          <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Rezervasyonlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Tüm rezervasyonların listesi ve yönetimi
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full sm:w-auto"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full sm:w-auto"
          >
            <option value="all">Tümü</option>
            <option value="pending">Bekleyen</option>
            <option value="confirmed">Onaylanan</option>
            <option value="cancelled">İptal Edilen</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full sm:w-auto"
          >
            <option value="date">Rezervasyon Tarihi</option>
            <option value="createdAt">Oluşturma Tarihi</option>
          </select>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-md bg-red-50 p-4 mb-6"
        >
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      <motion.div variants={fadeIn} className="bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">İsim</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Telefon</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tarih</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Saat</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kişi Sayısı</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Durum</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredReservations.map((reservation) => (
              <motion.tr
                key={reservation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
              >
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{reservation.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{reservation.phone}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{reservation.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{reservation.time}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{reservation.partySize}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <select
                    value={reservation.status}
                    onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                    className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="pending">Bekliyor</option>
                    <option value="confirmed">Onaylandı</option>
                    <option value="cancelled">İptal Edildi</option>
                  </select>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(reservation.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}