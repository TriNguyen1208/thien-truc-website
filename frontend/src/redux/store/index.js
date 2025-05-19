import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/slices/user.slice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;