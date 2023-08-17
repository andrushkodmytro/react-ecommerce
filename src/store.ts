import { configureStore } from '@reduxjs/toolkit';
import productListSlice from './pages/productList/productListSlice';
import addProductSlice from './pages/addProduct/addProductSlice';
import productDetailsSlice from './pages/productDetails/productDetailsSlice';
import ordersSlice from 'pages/orders/ordersSlice'
import homeSlice from './pages/home/homeSlice';
import userSlice from 'slices/userSlice';
import cartSlice from 'slices/cartSlice';

export const store = configureStore({
  reducer: { productListSlice, addProductSlice, productDetailsSlice, homeSlice, userSlice, cartSlice, ordersSlice },
});

export type RootState = ReturnType<typeof store.getState>;
