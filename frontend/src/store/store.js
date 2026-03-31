import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice.js';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        products: productsReducer,
    },
});

export default store;
