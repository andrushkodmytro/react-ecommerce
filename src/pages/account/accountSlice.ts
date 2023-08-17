import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
};

export type RoomType = {
  _id: string;
  name: string;
  description: string;
};

export type ProductListType = {
  categories: CategoryType[];
  rooms: RoomType[];
  isLoading: boolean;
};

const initialState: ProductListType = {
  categories: [],
  rooms: [],
  isLoading: false,
};

export const accountSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload.data;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCategories } = accountSlice.actions;

export default accountSlice.reducer;
