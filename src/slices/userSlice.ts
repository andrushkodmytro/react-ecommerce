import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth from 'auth'

interface IUser {
  _id: string;
  roles: any[]
  email: string;
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export type UserType = {
  user: IUser | null

};

const user = auth.getUser()

const initialState: UserType = {
  user: user || null,

};

export const userSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      auth.removeSession();
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
