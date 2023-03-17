import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCartOfUser } from '../Cart/CartSlice';
import { getSingleProducts } from './ProductSlice';
import { ActivityIndicator, Button } from 'react-native-paper';
export const ProductDetails = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { width } = Dimensions.get('window');
  const height = width * 0.6;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProducts(itemId));
  }, []);
  const { singleproduct } = useSelector((state) => state.products);
  const addToCart = (itemId) => {
    const reqBody = {
      id: 15,
      data: {
        merge: true, // this will include existing products in the cart
        products: [
          {
            id: itemId,
            quantity: 2,
          },
        ],
      },
    };
    dispatch(setCartOfUser(reqBody));
  };
  return (
    <View>
      {singleproduct ? (
        <View>
          <ScrollView pagingEnabled horizontal style={{ width, height }}>
            {singleproduct?.images ? (
              singleproduct.images.map((ele, i) => {
                return (
                  <Image
                    source={{
                      uri: ele,
                    }}
                    key={
                      new Date().getUTCMilliseconds() *
                      Math.floor(Math.random() * 452)
                    }
                    style={{ width, height, resizeMode: 'contain' }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>

          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            {singleproduct.title}
            {'     '}
            <TouchableOpacity style={styles.socialBarButton}>
              <Text style={styles.socialBarLabel}>{singleproduct.rating}</Text>
            </TouchableOpacity>
          </Text>
          <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
            {'  ₹'}
            {singleproduct.price}
            {'       '}
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: 'grey',
                  alignItems: 'center',
                }}
              >
                {singleproduct.discountPercentage}
                {'% off'}
              </Text>
            </View>
          </Text>
          <Text>{singleproduct.description}</Text>
          <Button
            onPress={addToCart}
            style={{ marginTop: 10, backgroundColor: 'grey', color: 'white' }}
          >
            Buy Now
          </Button>
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
