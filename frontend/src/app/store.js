import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js'
import postReducer from '../features/posts/postSlice.js'
// import generalReducer from '../features/general/generalSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    // general: generalReducer
  },
});
