import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'appData';
const MAX_ENTRIES = 50; // Reduced from 100 to 50
const MAX_AGE_DAYS = 15; // Reduced from 30 to 15

// Database schema and types
const schema = {
  reservations: {
    id: 'string',
    name: 'string',
    phone: 'string',
    date: 'string',
    time: 'string',
    partySize: 'number',
    notes: 'string',
    status: 'string',
    createdAt: 'string'
  },
  contacts: {
    id: 'string',
    name: 'string',
    email: 'string',
    phone: 'string',
    message: 'string',
    createdAt: 'string'
  }
};

// Type validation helper
const validateType = (value, type) => {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    default:
      return true;
  }
};

// Data validation against schema
const validateData = (data, schemaType) => {
  const schemaFields = schema[schemaType];
  if (!schemaFields) return false;

  for (const [field, type] of Object.entries(schemaFields)) {
    if (field === 'id' || field === 'createdAt') continue; // Skip auto-generated fields
    if (!validateType(data[field], type)) {
      console.error(`Invalid type for field ${field}. Expected ${type}, got ${typeof data[field]}`);
      return false;
    }
  }
  return true;
};

// Database class for managing data operations
class Database {
  constructor() {
    this.initializeDatabase();
  }

  // Initialize database with default structure
  initializeDatabase() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveData({ reservations: [], contacts: [] });
      }
    } catch (error) {
      console.error('Database initialization error:', error);
      throw new Error('Failed to initialize database');
    }
  }

  // Clean up old data
  cleanupOldData(data) {
    // Preserve all data without cleanup
    return {
      reservations: data.reservations || [],
      contacts: (data.contacts || [])
        .filter(c => new Date(c.createdAt) > new Date(new Date().setDate(new Date().getDate() - MAX_AGE_DAYS)))
        .slice(-MAX_ENTRIES)
    };
  }

  // Get all data from storage
  getData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const parsedData = data ? JSON.parse(data) : { reservations: [], contacts: [] };
      return this.cleanupOldData(parsedData);
    } catch (error) {
      console.error('Error reading from database:', error);
      return { reservations: [], contacts: [] };
    }
  }

  // Save data to storage
  saveData(data) {
    try {
      const cleanedData = this.cleanupOldData(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedData));
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // Handle storage quota exceeded - more aggressive cleanup
        const reducedData = {
          reservations: data.reservations.slice(-Math.floor(MAX_ENTRIES/4)), // Keep only 1/4 of max entries
          contacts: data.contacts.slice(-Math.floor(MAX_ENTRIES/4))
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedData));
          return true;
        } catch (retryError) {
          // If still failing, try with minimal data
          try {
            const minimalData = {
              reservations: data.reservations.slice(-10), // Keep only 10 most recent entries
              contacts: data.contacts.slice(-5)
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalData));
            return true;
          } catch (finalError) {
            console.error('Error saving to database after aggressive cleanup:', finalError);
            return false;
          }
        }
      }
      console.error('Error saving to database:', error);
      return false;
    }
  }

  // Generic add method
  add(type, data) {
    if (!validateData(data, type)) {
      throw new Error(`Invalid ${type} data`);
    }

    const dbData = this.getData();
    const newItem = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };

    if (!dbData[type]) dbData[type] = [];
    dbData[type].push(newItem);

    if (!this.saveData(dbData)) {
      throw new Error(`Failed to save ${type}`);
    }

    return newItem;
  }

  // Generic get all method
  getAll(type) {
    const data = this.getData();
    return data[type] || [];
  }

  // Generic update method
  update(type, id, updateData) {
    const data = this.getData();
    const index = data[type]?.findIndex(item => item.id === id);

    if (index === -1 || index === undefined) {
      throw new Error(`${type} not found`);
    }

    if (!validateData({ ...data[type][index], ...updateData }, type)) {
      throw new Error(`Invalid ${type} update data`);
    }

    data[type][index] = { ...data[type][index], ...updateData };

    if (!this.saveData(data)) {
      throw new Error(`Failed to update ${type}`);
    }

    return data[type][index];
  }

  // Generic delete method
  delete(type, id) {
    const data = this.getData();
    const index = data[type]?.findIndex(item => item.id === id);

    if (index === -1 || index === undefined) {
      throw new Error(`${type} not found`);
    }

    data[type].splice(index, 1);

    if (!this.saveData(data)) {
      throw new Error(`Failed to delete ${type}`);
    }

    return true;
  }

  // Get by ID method
  getById(type, id) {
    const data = this.getData();
    return data[type]?.find(item => item.id === id);
  }

  // Query method with filters
  query(type, filters = {}) {
    const data = this.getData();
    return data[type]?.filter(item => {
      return Object.entries(filters).every(([key, value]) => item[key] === value);
    }) || [];
  }
}

// Create and export database instance
const db = new Database();
export default db;