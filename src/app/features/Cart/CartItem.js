import axios from 'axios';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

export const CartItem = ({ item, navigation }) => {
  const { width } = Dimensions.get('window');
  const [image, setImages] = useState([]);
  const height = width * 0.6;
  const getImage = (id) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((data) => {
        setImages(data.data?.images);
      })
      .catch((error) => console.log(error));
    return image;
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>
            {'Price : '}
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
        <View>
          <Text style={styles.price}>
            {'Price : '}
            {'₹'}
            {item.discountedPrice}
          </Text>
          <Text>
            {'Quantity : '}
            {item.quantity}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <ScrollView pagingEnabled horizontal style={{ width, height }}>
          {getImage(item.id).map((ele, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    itemId: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri: ele,
                  }}
                  key={i.i}
                  style={{ width, height, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
    borderRadius: 5,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
