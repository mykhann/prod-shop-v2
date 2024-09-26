import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            const existingProduct = state.cartItems.find(item => item._id === action.payload._id);
            if (existingProduct) {
                // If the product already exists, increase its quantity
                existingProduct.quantity += 1;
            } else {
                // Otherwise, add the product to the cart with a quantity of 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQuantity: (state, action) => {
            const product = state.cartItems.find(item => item._id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.cartItems.find(item => item._id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = []; 
        },
    }
});




export default cartSlice.reducer;
export const { setCartItems,clearCart, increaseQuantity, decreaseQuantity, removeCartItem } = cartSlice.actions;
