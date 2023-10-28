import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { popupReducer } from "./popup.reducer";
import { loadingReducer } from "./loading.reducer";
import { userReducer } from "./user.reducer";
import { popupFilterReducer } from "./popup-filter.reducer";

const store = configureStore({
  reducer: {
    popup: popupReducer,
    loading: loadingReducer,
    user: userReducer,
    popupFilter: popupFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
