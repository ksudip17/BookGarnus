import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import DeleteModal from './components/DeleteModal';
import { bookingAPI } from './services/api';

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingAPI.getAll();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const newBooking = await bookingAPI.create(formData);
      setBookings([newBooking, ...bookings]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updated = await bookingAPI.update(id, formData);
      setBookings(bookings.map(b => b._id === updated._id ? updated : b));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      await bookingAPI.delete(deleteModal.id);
      setBookings(bookings.filter(b => b._id !== deleteModal.id));
      setError(null);
      closeDeleteModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-3 animate-pulse">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <BookingForm
        onSubmit={handleCreate}
      />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <BookingList
          bookings={bookings}
          onUpdate={handleUpdate}
          onDelete={openDeleteModal}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
};

export default App;