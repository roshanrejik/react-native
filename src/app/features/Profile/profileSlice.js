import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../services/axios-config';

const initialState = { entities: [], loading: false };

export const getUser = createAsyncThunk(
  'profile/user',
  async (id, { rejectWithValue }) => {
    const response = await api.Profile.getById(id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
  },
});

export default profileSlice.reducer;
