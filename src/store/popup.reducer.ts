import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PopupMassage } from "../types/popup";

type PopupState = {
  popup: PopupMassage | null;
};

const initialState: PopupState = {
  popup: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, action: PayloadAction<PopupMassage>) => {
      state.popup = action.payload;
    },
    removePopup: (state) => {
      state.popup = null;
    },
  },
});

export const setPopup = popupSlice.actions.setPopup;
export const removePopup = popupSlice.actions.removePopup;
export const popupReducer = popupSlice.reducer;
