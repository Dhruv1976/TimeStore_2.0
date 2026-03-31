import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearProductsError(state) {
            state.error = null;
        },
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, clearProductsError } = productsSlice.actions;
export default productsSlice.reducer;