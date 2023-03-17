import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { CartList } from './CartList';
import { getCartOfUser } from './CartSlice';

export const Cart = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartOfUser(15));
  }, []);
  return (
    <View>
      <CartList navigation={navigation} />
    </View>
  );
};
