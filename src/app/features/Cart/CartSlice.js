import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/axios-config';
const initialState = { data: {}, loading: false, carts: [] };
export const getCartOfUser = createAsyncThunk(
  'cart/getCartOfUser',
  async (data, { rejectWithValue }) => {
    const response = await api.Cart.getCartOfUser(data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    return response.data;
  }
);
export const setCartOfUser = createAsyncThunk(
  'cart/setCartOfUser',
  async (data, { rejectWithValue }) => {
    console.log(data, 'dataa');
    const response = await api.Cart.setCartOfUser(data)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    return response.data;
  }
);
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartOfUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.carts = action.payload?.carts;
      })
      .addCase(getCartOfUser.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setCartOfUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setCartOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(setCartOfUser.rejected, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      });
  },
});

export default cartSlice.reducer;
