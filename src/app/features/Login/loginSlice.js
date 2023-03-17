import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../services/axios-config';

const initialState = { entities: [], loading: 'idle' };

const saveData = async (token) => {
  try {
    console.log('tokennnn', token);
    await AsyncStorage.setItem('authToken', JSON.stringify(token));
    // console.log(token);
  } catch (err) {
    alert(JSON.stringify(token));
  }
};
export const loginUser = createAsyncThunk(
  'account/login',
  async (data, { rejectWithValue }) => {
    const response = await api.Auth.login(data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    saveData(response.data);
    return response.data;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.entities = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.entities = action.payload;
    });
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
