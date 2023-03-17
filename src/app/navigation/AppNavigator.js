import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../features/Profile/Profile';
import Products from '../features/Products/Products';
import { Cart } from '../features/Cart/Cart';
import { ProductDetails } from '../features/Products/ProductDetails';

const AppNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="Products">
      <Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />
      <Screen
        name="Profile"
        options={{ title: 'My Profile' }}
        component={Profile}
      />
      <Screen
        name="Cart"
        options={{ title: 'My Cart List' }}
        component={Cart}
      />
      <Screen
        name="ProductDetails"
        options={{ title: 'Details' }}
        component={ProductDetails}
      />
    </Navigator>
  );
};

export default AppNavigator;
