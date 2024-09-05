import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlie";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
