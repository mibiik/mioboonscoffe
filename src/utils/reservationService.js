import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'appData';
const MAX_ENTRIES = 50; // Reduced from 100 to 50
const MAX_AGE_DAYS = 15; // Reduced from 30 to 15

// Helper function to get data from storage
const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsedData = data ? JSON.parse(data) : { reservations: [], contacts: [] };
    return parsedData;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return { reservations: [], contacts: [] };
  }
};

// Helper function to save data to storage
const saveData = (data) => {
  try {
    // Compress data by removing unnecessary whitespace
    const compressedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, compressedData);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      // Handle storage quota exceeded
      const oldData = getData();
      if (oldData.reservations && oldData.reservations.length > 0) {
        // Remove older entries to make space - more aggressive cleanup
        oldData.reservations = oldData.reservations.slice(-Math.floor(MAX_ENTRIES / 4));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(oldData));
          // Try saving the new data again
          return saveData(data);
        } catch (retryError) {
          // If still failing, try with minimal data
          try {
            const minimalData = {
              reservations: oldData.reservations.slice(-10), // Keep only 10 most recent entries
              contacts: oldData.contacts ? oldData.contacts.slice(-5) : []
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalData));
            return true;
          } catch (finalError) {
            console.error('Error saving to storage after aggressive cleanup:', finalError);
            return false;
          }
        }
      }
    }
    console.error('Error saving to storage:', error);
    return false;
  }
};

// Add a new reservation
export const addReservation = async (reservationData) => {
  const data = getData();
  const newReservation = {
    ...reservationData,
    id: uuidv4(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  if (!data.reservations) {
    data.reservations = [];
  }

  // Validate reservation
  if (newReservation.partySize > 30) {
    throw new Error('Party size cannot exceed 30 people');
  }

  // Check if the time slot is available
  const isTimeSlotAvailable = !data.reservations.some(reservation => 
    reservation.date === newReservation.date &&
    reservation.time === newReservation.time
  );

  if (!isTimeSlotAvailable) {
    throw new Error('This time slot is already booked');
  }

  data.reservations.push(newReservation);
  const success = saveData(data);

  if (!success) {
    throw new Error('Failed to save reservation. Please try again later.');
  }

  return newReservation;
};

// Get all reservations
export const getReservations = () => {
  const data = getData();
  return data.reservations || [];
};

// Update reservation status
export const updateReservationStatus = async (id, status) => {
  const data = getData();
  const reservationIndex = data.reservations.findIndex(r => r.id === id);

  if (reservationIndex === -1) {
    throw new Error('Reservation not found');
  }

  data.reservations[reservationIndex].status = status;
  const success = saveData(data);

  if (!success) {
    throw new Error('Failed to update reservation status');
  }

  return data.reservations[reservationIndex];
};

// Delete reservation
export const deleteReservation = async (id) => {
  const data = getData();
  const reservationIndex = data.reservations.findIndex(r => r.id === id);

  if (reservationIndex === -1) {
    throw new Error('Reservation not found');
  }

  data.reservations.splice(reservationIndex, 1);
  const success = saveData(data);

  if (!success) {
    throw new Error('Failed to delete reservation');
  }

  return true;
};