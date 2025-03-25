import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "@/app/login/loginSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { userLogin: userLoginReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
