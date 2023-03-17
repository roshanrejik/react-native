import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { getAuthToken } from '../../services/constants';
import { setCartOfUser } from '../Cart/CartSlice';

export const ProductItem = (props) => {
  const { styles, item, nav } = props;
  const dispatch = useDispatch();
  const { navigation } = nav;

  const addToCart = (itemId) => {
    const reqBody = {
      userId: 15,
      products: [
        {
          id: itemId,
          quantity: 1,
        },
      ],
    };
    dispatch(setCartOfUser(reqBody));
  };

  const getAuthToken = async () => {
    let data = await AsyncStorage.getItem('authToken')
      .then((res) => {
        return res;
      })
      .catch((err) => err);
    return JSON.parse(data);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>
            {'₹'}
            {item.price}
            <Text
              style={{
                color: 'red',
              }}
            >
              {'      '}
              {item.discountPercentage}
              {'% off'}
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            itemId: item.id,
          })
        }
      >
        <Image style={styles.cardImage} source={{ uri: item.thumbnail }} />
      </TouchableOpacity>

      <View style={styles.cardFooter}>
        <View style={styles.socialBarContainer}>
          <View style={styles.socialBarSection}>
            <TouchableOpacity
              style={styles.socialBarButton}
              onPress={() => {
                addToCart(item.id);
              }}
            >
              <Image
                style={styles.icon}
                source={{
                  uri: 'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png',
                }}
              />
              <Text style={[styles.socialBarLabel, styles.buyNow]}>
                ADD CART
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialBarSection}>
            <TouchableOpacity style={styles.socialBarButton}>
              <Image
                style={styles.icon}
                source={{
                  uri: 'https://img.icons8.com/color/50/000000/hearts.png',
                }}
              />
              <Text style={styles.socialBarLabel}>{item.rating}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
