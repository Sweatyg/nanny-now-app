import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EUserRole, Parrent, UserProfile } from "../types/user";

type UserState = {
  user: UserProfile<Parrent> | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserProfile<Parrent>>) => {
      // state.user = { ...actions.payload };
      state.user = {
        ...actions.payload,
      };
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const setUser = userSlice.actions.setUser;
export const removeUser = userSlice.actions.removeUser;
export const userReducer = userSlice.reducer;
