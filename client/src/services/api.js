const API_BASE_URL = 'http://localhost:8080/api/v1/bookings';


const handleResponse = async (response) => {

  if (!response.ok) {

    let errorMessage = `Server error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {

      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }


  const data = await response.json();
  

  if (data.success === false) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  

  return data.data || data;
};

export const bookingAPI = {
  // Get all bookings
  getAll: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 8080.');
      }
      throw error;
    }
  },

  // Get single booking
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 8080.');
      }
      throw error;
    }
  },

  // Create booking
  create: async (bookingData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 8080.');
      }
      throw error;
    }
  },

  // Update booking
  update: async (id, bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 8080.');
      }
      throw error;
    }
  },

  // Delete booking
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      return await handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 8080.');
      }
      throw error;
    }
  }
};