import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from 'interfaces';

export type ProductListType = {
  categories: ICategory[];

  isLoading: boolean;
};

const initialState: ProductListType = {
  categories: [],
  isLoading: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload.data;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetPage: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, getCategories, resetPage } = homeSlice.actions;

export default homeSlice.reducer;
