import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICategory {
  _id: string;
  imgUrl: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface IRoom {
  _id: string;
  imgUrl: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


export type ProductType = {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  roomId: string;
  description: string;
  imgUrl: string;
  imgGallery: string[];
  createdAt: string;
  updatedAt: string;
  category?: ICategory;
  room?: IRoom;
};

const initialState: ProductType = {
  name: '',
  categoryId: '',
  roomId: '',
  createdAt: '',
  description: '',
  imgUrl: '',
  imgGallery: [],
  price: 0,
  updatedAt: '',
  _id: '',
};

export const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<ProductType>) => {
      return action.payload;
    },
    resetPage: (state) => {
      return initialState
    }
  },
});

// Action creators are generated for each case reducer function
export const { getProduct, resetPage } = productSlice.actions;

export default productSlice.reducer;
