import { createSlice } from '@reduxjs/toolkit';

const persistedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authUser') || 'null') : null;

// Role constants
const ROLE_ADMIN = 'admin';
const ROLE_USER = 'user';

const initialState = {
    user: persistedUser,
    isLoading: false,
    isInitialized: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            const user = action.payload || {};
            const normalizedRole = (user.role || ROLE_USER).toLowerCase();
            state.user = {
                ...user,
                role: normalizedRole
            };
            state.isInitialized = true;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.setItem('authUser', JSON.stringify(state.user));
            }
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
            state.isInitialized = true;
        },
        logout(state) {
            state.user = null;
            state.error = null;
            state.isInitialized = true;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authUser');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        },
        clearError(state) {
            state.error = null;
        },
        authInitialized(state) {
            state.isInitialized = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, authInitialized } = authSlice.actions;
export default authSlice.reducer;