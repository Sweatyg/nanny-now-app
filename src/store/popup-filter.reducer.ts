import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterValue } from "../types/popup-filter";

type PopupFilterState = {
  show: boolean;
  filterValue: FilterValue;
};

const initialFilterValue: FilterValue = {
  careType: "",
  gender: "",
  location: {
    city: "",
    district: "",
  },
  priceRange: {
    min: "",
    max: "",
  },
};

const initialState: PopupFilterState = {
  show: false,
  filterValue: initialFilterValue,
};

const popupFilterSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopupFilter: (state) => {
      state.show = true;
    },
    hidePopupFilter: (state) => {
      state.show = false;
    },
    setFilterValue: (state, action: PayloadAction<FilterValue>) => {},
    removeFilterValue: (state) => {},
  },
});

export const showPopupFilter = popupFilterSlice.actions.showPopupFilter;
export const hidePopupFilter = popupFilterSlice.actions.hidePopupFilter;
export const setFilterValue = popupFilterSlice.actions.setFilterValue;
export const removeFilterValue = popupFilterSlice.actions.removeFilterValue;
export const popupFilterReducer = popupFilterSlice.reducer;
