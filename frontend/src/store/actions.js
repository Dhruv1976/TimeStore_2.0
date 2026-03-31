import { loginSuccess, logout, authInitialized } from './slices/authSlice';
import apiClient from '../services/apiClient';

export const initializeAuth = () => async (dispatch) => {
    const hasLocalUser = typeof window !== 'undefined' && localStorage.getItem('authUser');
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    
    try {
        if (accessToken) {
            const response = await apiClient.get('/users/me');
            const user = response.user || response;
            if (user && user.id) {
                dispatch(loginSuccess(user));
                return;
            }
        }
        
        if (hasLocalUser) {
            const user = JSON.parse(localStorage.getItem('authUser'));
            dispatch(loginSuccess(user));
        } else {
            dispatch(authInitialized());
        }
    } catch (error) {
        console.error('Auth initialization error:', error);
        
        if (error.message && error.message.includes('HTTP 401')) {
            dispatch(logout());
        } else if (hasLocalUser) {
            const user = JSON.parse(localStorage.getItem('authUser'));
            dispatch(loginSuccess(user));
        } else {
            dispatch(authInitialized());
        }
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await apiClient.post("/users/logout");
    } catch (error) {
        console.error("Logout error:", error);
    }
    dispatch(logout());
};