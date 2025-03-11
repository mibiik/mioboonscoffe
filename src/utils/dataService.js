import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'appData';
const MAX_ENTRIES = 100;
const MAX_AGE_DAYS = 30;

// Helper function to clean up old data
const cleanupOldData = (data) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - MAX_AGE_DAYS);

  return {
    contacts: (data.contacts || [])
      .filter(c => new Date(c.createdAt) > cutoffDate)
      .slice(-MAX_ENTRIES)
  };
};

// Helper function to safely parse JSON
const safeJSONParse = (str, fallback = null) => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

// Helper function to safely stringify JSON
const safeJSONStringify = (data) => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('JSON stringify error:', error);
    return null;
  }
};

// Helper function to get data from storage
const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsedData = safeJSONParse(data, { contacts: [] });
    return cleanupOldData(parsedData);
  } catch (error) {
    console.error('Error reading from storage:', error);
    return { contacts: [] };
  }
};

// Helper function to save data to storage
const saveData = (data) => {
  try {
    const cleanedData = cleanupOldData(data);
    const dataString = safeJSONStringify(cleanedData);
    
    if (!dataString) {
      throw new Error('Failed to stringify data');
    }

    try {
      localStorage.setItem(STORAGE_KEY, dataString);
      return true;
    } catch (storageError) {
      // If storage is full, try aggressive cleanup
      if (storageError.name === 'QuotaExceededError') {
        const aggressiveCleanData = {
          reservations: cleanedData.reservations.slice(-50),
          contacts: cleanedData.contacts.slice(-50)
        };
        const reducedDataString = safeJSONStringify(aggressiveCleanData);
        if (reducedDataString) {
          localStorage.setItem(STORAGE_KEY, reducedDataString);
          return true;
        }
      }
      throw storageError;
    }
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};



// Contact functions
export const addContact = async (contactData) => {
  const data = getData();
  const newContact = {
    ...contactData,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };

  data.contacts.push(newContact);
  const success = saveData(data);

  if (!success) {
    throw new Error('Failed to save contact message. Please try again later.');
  }

  return newContact;
};

export const getContacts = () => {
  const data = getData();
  return data.contacts;
};