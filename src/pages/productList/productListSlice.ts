import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductType = {
  name: string;
  price: number;
  image: string;
};

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
  products: [] | ProductType[];
  total: number;
  page: number;
  isLoading: boolean;
  sortBy: string;
  orderBy: string;
  selectedCategories: string[];
  categories: [] | CategoryType[];
  rooms: RoomType[];
  selectedRooms: string[];
  search: string;
};

const initialState: ProductListType = {
  products: [],
  total: 0,
  page: 1,
  isLoading: true,
  sortBy: 'price',
  orderBy: 'asc',
  selectedCategories: [],
  categories: [],
  rooms: [],
  selectedRooms: [],
  search: ''
};

export const counterSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.data;
      state.total = action.payload.totalPages;
      state.page = action.payload.page;
      state.isLoading = false;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      const [sortBy, orderBy] = action.payload.split(' ');
      state.sortBy = sortBy;
      state.orderBy = orderBy;
    },
    setSelectedCategories: (state, action: PayloadAction<string>) => {
      if (state.selectedCategories.includes(action.payload)) {
        state.selectedCategories = state.selectedCategories.filter(
          (id) => id !== action.payload,
        );
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setSelectedRooms: (state, action: PayloadAction<string>) => {
      if (state.selectedRooms.includes(action.payload)) {
        state.selectedRooms = state.selectedRooms.filter(
          (id) => id !== action.payload,
        );
      } else {
        state.selectedRooms.push(action.payload);
      }
    },
    setSearch: (state, action) => {

      state.search = action.payload
    },
    resetPage: (state) => {
      return state
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  getProducts,
  setPage,
  setSorting,
  setIsLoading,
  setSelectedCategories,
  setCategories,
  setRooms,
  setSelectedRooms,
  setSearch,
  resetPage
} = counterSlice.actions;

export default counterSlice.reducer;
