import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IOrder {
  _id: string;
  status: string;
  // user: string;
  // contactInfo: any;
  products: any[];
  createdAt: string;
  // updatedAt: string;
}



export type ProductType = {
  data: IOrder[];
  page: number;
  totalPages: number;
};

const initialState: ProductType = {
  data: [],
  page: 1,
  totalPages: 0,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: (state, action: PayloadAction<ProductType>) => {
      return action.payload;
    },
    resetPage: (state) => {
      return initialState
    }
  },
});


export const { getOrders, resetPage } = ordersSlice.actions;

export default ordersSlice.reducer;
