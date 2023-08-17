import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProducts {
  createdAt: string,
  price: number,
  productId: any,
  quantity: number,
  updatedAt: string,
  _id: string,
}

interface ICart {
  products: IProducts[] |[],
  open: boolean,
}

const initialState: ICart = {
  products: [],
  open: false,

};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setCart: (state, action) => {
      state.products = action.payload;
    },
    resetCart: () => {
      return initialState
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
