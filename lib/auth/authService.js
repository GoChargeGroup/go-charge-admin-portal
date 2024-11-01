import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

export const login = async (username, password) => {
  try {
    const queryParams = new URLSearchParams({
      username,
      password,
    }).toString();

    const response = await fetch(`${BASE_URL}/login?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Incorrect username or password');
    }

    const user = await response.json();

    const token = response.headers.get('Authorization');
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    } else {
      throw new Error('Token not found in response');
    }

    return user; 
  } catch (error) {
    throw error; 
  }
};

export const signup = async (username, password, email, role) => {
  try {
    const queryParams = new URLSearchParams({
      username,
      password,
      email,
      role: role || 'user',
    }).toString();

    const response = await fetch(`${BASE_URL}/signup?${queryParams}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.headers.get('Authorization');
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    } else {
      throw new Error('Token not found in response');
    }

    const user = await response.json();

    if (!response.ok) {
      throw new Error(user || 'Something went wrong during signup');
    }
    console.log(user);
    return user; 
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendEmailVerification = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/password-reset-request`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error('Could not find account. Please check your email and try again.');
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (otp, password) => {
  try {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otp,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update password');
    }

    const token = response.headers.get('Authorization');
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    } else {
      throw new Error('Token not found in response');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const sendDeleteVerification = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}/user/delete-account-request`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error('Failed to send email verification. Please try again.');
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (userId, updates) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log(token);
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/user/edit-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, 
      },
      body: JSON.stringify({
        username: updates.username,
        password: updates.password, 
        email: updates.email,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update the user');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (otp) => {
  const token = await AsyncStorage.getItem('authToken');
  
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${BASE_URL}/user/delete-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      otp: otp,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.message || 'Failed to delete the account');
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken'); 
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
