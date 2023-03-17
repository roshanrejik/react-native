import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/Login/Login';

const AuthNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default AuthNavigator;
