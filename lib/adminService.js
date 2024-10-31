import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

export const getUnapprovedStations = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/admin/unapproved-stations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update the user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const approveStation = async (station_id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/admin/approve-station`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({
        station_id: station_id,
        Approved: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to approve the station');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const denyStation = async (station_id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/admin/approve-station`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({
        station_id: station_id,
        Approved: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to deny the station');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};