import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  let data = await AsyncStorage.getItem('authToken')
    .then((res) => {
      return res;
    })
    .catch((err) => err);
  console.log(JSON.parse(data), 'ress');
  return JSON.parse(data);
};
