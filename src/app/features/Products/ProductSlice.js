import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/axios-config';
const initialState = {
  data: {},
  loading: false,
  products: [],
  singleproduct: {},
};

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (data, { rejectWithValue }) => {
    const response = await api.Products.getAllProducts(data)
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
export const getSingleProducts = createAsyncThunk(
  'products/getSingleProducts',
  async (data, { rejectWithValue }) => {
    const response = await api.Products.getSingleProducts(data)
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
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.products = action.payload?.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSingleProducts.pending, (state, action) => {
        state.loading = true;
        state.singleproduct = {};
      })
      .addCase(getSingleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.singleproduct = action.payload;
      })
      .addCase(getSingleProducts.rejected, (state, action) => {
        state.loading = false;
        state.singleproduct = action.payload;
      });
  },
});

export default productSlice.reducer;
