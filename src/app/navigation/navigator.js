import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const AppRoute = () => {
  //   const { Navigator, Screen } = createNativeStackNavigator();
  const { entities } = useSelector((state) => state.login);
  const [token, setToken] = useState(null);
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('authToken');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  useEffect(() => {
    if (entities && entities.token) {
      setToken(entities.token);
    } else {
      setToken(null);
    }
  }, [entities]);

  useEffect(() => {
    readData();
  }, []);

  //   console.log(token);

  console.log('here in app', token);
  return (
    <NavigationContainer>
      {token === null ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
