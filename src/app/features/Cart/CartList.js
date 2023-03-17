import { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { CartItem } from './CartItem';

export const CartList = ({ navigation }) => {
  const { cart } = useSelector((state) => state);
  const [userCart, settUserCart] = useState({});
  useEffect(() => {
    settUserCart(cart?.carts ? cart.carts[0] || {} : {});
  }, [cart]);

  return Object.keys(userCart).length == 0 ? (
    <ActivityIndicator size="large" />
  ) : (
    <View>
      <FlatList
        data={userCart?.products}
        renderItem={(post) => (
          <CartItem item={post.item} navigation={navigation} />
        )}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
