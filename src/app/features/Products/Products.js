import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList } from './ProductList';
import { getAllProducts } from './ProductSlice';
function Products(props) {
  console.log(props, ':;;');
  const {
    navigation: { navigate },
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state) => state);
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            position: 'absolute',
            left: 0,
            top: 0,
            padding: 0,
          }}
        >
          Products
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            height: 40,
            padding: 0,
          }}
        >
          <Button
            buttonColor="#3E2892"
            textColor="white"
            onPress={() => navigate('Profile')}
          >
            Profile
          </Button>
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <Image
              style={{ height: 40, width: 40, padding: 10 }}
              source={require('../../assets/cart.png')}
            />
          </TouchableOpacity>
        </View>
        {products?.products?.length > 0 ? (
          <View>
            <ProductList data={products} nav={props} />
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
}

export default Products;
