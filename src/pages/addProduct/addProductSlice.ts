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

export const counterSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload.data;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    getRooms: (state, action) => {
      state.rooms = action.payload.data;
      state.isLoading = false;
    },
    resetPage: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, getCategories, getRooms, resetPage } =
  counterSlice.actions;

export default counterSlice.reducer;
