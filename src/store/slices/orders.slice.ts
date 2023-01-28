import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Order } from '~/types/temp';
import { backUrl } from '~/constants/backUrl';

interface StateProps {
  ordersLoading: boolean;
  orders: Order[] | null;
  order: Order | null;
}

const initialState: StateProps = {
  ordersLoading: false,
  orders: null,
  order: null,
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, thunkAPI) => {
    try {
      const response = axios.get(`${backUrl}clinic/lab-orders`);
      console.log('orders/getOrders', response);

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.body.error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload as any;
      })
      .addCase(getOrders.rejected, (_, action) => {
        console.log(action);
        toast.error(action.payload as string);
      });
  },
});

export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
