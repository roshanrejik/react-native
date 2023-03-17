import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { logout } from '../Login/loginSlice';
import {
  Button,
  Text,
  TextInput,
  ActivityIndicator,
  MD2Colors,
  Avatar,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './profileSlice';

function Profile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(15)); //id need to be assigned
  }, [dispatch]);

  const { entities, loading } = useSelector((store) => store.profile);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      // alert('Successfully logged out!');
    } catch (e) {
      alert('Failed to log out!');
    }
  };

  const logoutApp = () => {
    dispatch(logout());
    clearStorage();
  };

  return (
    <ScrollView>
      <Button
        buttonColor="#922828"
        textColor="white"
        style={styles.button}
        onPress={logoutApp}
      >
        Logout
      </Button>
      <View style={styles.wrapper}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.cyan700}
            size="large"
          />
        ) : (
          <View>
            <Avatar.Image
              size={90}
              source={{ uri: entities?.image }}
              style={styles.avatar}
            />
            <Text variant="headlineSmall">Username</Text>
            <TextInput
              dense
              placeholder="Full Name"
              disabled
              value={entities?.username}
            />
            <Text variant="headlineSmall">Gender</Text>
            <TextInput
              dense
              placeholder="Gender"
              disabled
              value={entities?.gender}
            />
            <Text variant="headlineSmall">Email</Text>
            <TextInput
              dense
              placeholder="Email"
              disabled
              value={entities?.email}
            />
            <Text variant="headlineSmall">Phone</Text>
            <TextInput
              dense
              placeholder="Phone"
              disabled
              value={entities?.phone}
            />
            <Text variant="headlineSmall">DOB</Text>
            <TextInput
              dense
              placeholder="DOB"
              disabled
              value={entities?.birthDate}
            />
            <Text variant="headlineSmall">Address (Home)</Text>
            <TextInput
              dense
              placeholder="Address"
              style={{ marginBottom: 10 }}
              disabled
              value={entities?.address?.address}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                dense
                placeholder="City"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.address?.city}
              />
              <TextInput
                dense
                placeholder="State"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.address?.state}
              />
              <TextInput
                dense
                placeholder="Postal Code"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.address?.postalCode}
              />
            </View>
            <Text variant="headlineSmall">Address (Company)</Text>
            <TextInput
              dense
              placeholder="Address"
              style={{ marginBottom: 10 }}
              disabled
              value={entities?.company?.address?.address}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                dense
                placeholder="City"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.company?.address?.city}
              />
              <TextInput
                dense
                placeholder="State"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.company?.address?.state}
              />
              <TextInput
                dense
                placeholder="Postal Code"
                style={{ marginBottom: 10 }}
                disabled
                value={entities?.company?.address?.postalCode}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  button: {
    marginTop: 5,
    width: 90,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 5,
  },
});

export default Profile;
