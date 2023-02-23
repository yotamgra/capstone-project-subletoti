import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import postReducer from "../features/posts/postSlice.js";
import reservationReducer from "../features/reservations/reservationSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    reservations: reservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
