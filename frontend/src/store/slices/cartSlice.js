import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id);

            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                state.items.push({ ...item, quantity: item.quantity || 1 });
            }

            state.totalQuantity += item.quantity || 1;
            state.totalPrice += (item.price * (item.quantity || 1));
        },
        removeItem(state, action) {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.items = state.items.filter(i => i.id !== id);
            }
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && quantity > 0) {
                state.totalQuantity += (quantity - item.quantity);
                state.totalPrice += item.price * (quantity - item.quantity);
                item.quantity = quantity;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        setCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQuantity = action.payload.totalQuantity || 0;
            state.totalPrice = action.payload.totalPrice || 0;
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

