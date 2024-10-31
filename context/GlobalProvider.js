import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Retrieve user data from AsyncStorage on app start
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 
  useEffect(() => {
    if (isLoggedIn && user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        fetchUser,
        logout, // Provide logout functionality to clear state and storage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;