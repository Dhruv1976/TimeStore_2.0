import { loginSuccess, logout, authInitialized } from './slices/authSlice';
import { setCart, clearCart } from './slices/cartSlice';
import apiClient from '../services/apiClient';

const mapCartData = (cartData) => ({
    items: cartData.items.map(item => ({
        id: item.productId._id || item.productId,
        title: item.title || item.productId?.title,
        price: item.price || item.productId?.price,
        quantity: item.quantity,
        img: item.image || item.productId?.image
    })),
    totalQuantity: cartData.totalQuantity,
    totalPrice: cartData.totalPrice
});

export const initializeAuth = () => async (dispatch) => {
    const hasLocalUser = typeof window !== 'undefined' && localStorage.getItem('authUser');
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    
    try {
        if (accessToken) {
            const response = await apiClient.get('/users/me');
            const user = response.user || response;
            if (user && user.id) {
                dispatch(loginSuccess(user));
                await dispatch(fetchCart());
                dispatch(authInitialized());
                return;
            }
        }
        
        if (hasLocalUser) {
            const user = JSON.parse(localStorage.getItem('authUser'));
            dispatch(loginSuccess(user));
            await dispatch(fetchCart());
            dispatch(authInitialized());
        } else {
            dispatch(authInitialized());
        }
    } catch (error) {
        if (error.message && error.message.includes('HTTP 401')) {
            dispatch(logout());
        } else if (hasLocalUser) {
            const user = JSON.parse(localStorage.getItem('authUser'));
            dispatch(loginSuccess(user));
            await dispatch(fetchCart());
            dispatch(authInitialized());
        } else {
            dispatch(authInitialized());
        }
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await apiClient.post("/users/logout");
    } catch (error) {
    }
    dispatch(logout());
    dispatch(clearCart());
};

export const fetchCart = () => async (dispatch) => {
    try {
        const cartData = await apiClient.get('/cart');
        dispatch(setCart(mapCartData(cartData)));
    } catch (error) {
        dispatch(clearCart());
    }
};

export const addItemToCart = (productId, quantity = 1, price, title, image) => async (dispatch) => {
    try {
        const cartData = await apiClient.post('/cart', {
            productId,
            quantity,
            price,
            title,
            image
        });
        dispatch(setCart(mapCartData(cartData)));
    } catch (error) {
        throw error;
    }
};

export const removeItemFromCart = (productId) => async (dispatch) => {
    try {
        const cartData = await apiClient.delete(`/cart/${productId}`);
        dispatch(setCart(mapCartData(cartData)));
    } catch (error) {
        throw error;
    }
};

export const updateCartItemQuantity = (productId, quantity) => async (dispatch) => {
    try {
        const cartData = await apiClient.patch(`/cart/${productId}`, { quantity });
        dispatch(setCart(mapCartData(cartData)));
    } catch (error) {
        throw error;
    }
};

export const clearUserCart = () => async (dispatch) => {
    try {
        await apiClient.delete('/cart/clear');
        dispatch(clearCart());
    } catch (error) {
        throw error;
    }
};