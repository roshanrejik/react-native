import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './loginSlice';

function LoginScreen(props) {
  const {
    navigation: { navigate },
  } = props;

  console.log(props);

  const { entities } = useSelector((store) => store.login);

  // const saveData = async (token) => {
  //   try {
  //     await AsyncStorage.setItem('authToken', entities.token);
  //     // console.log(token);
  //     // alert('Successfully logged in!');
  //     navigate('Products');
  //   } catch (err) {
  //     alert('Failed to log in!');
  //   }
  // };

  const [email, setEmail] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');

  useEffect(() => {
    if (entities && entities.token) {
      navigate('Products');
    }
  }, [entities]);

  const dispatch = useDispatch();
  const login = () => {
    const formData = {
      username: email,
      password,
    };

    dispatch(loginUser(formData));

    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            type="flat"
            dense
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            type="flat"
            secureTextEntry
            value={password}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            dense
          />
        </View>
        <Button
          mode="contained-tonal"
          buttonColor="#395B64"
          textColor="white"
          onPress={login}
        >
          Log In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#99A9EF',
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 15,
  },
  label: {
    color: '#16213E',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
});

export default LoginScreen;
