/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * parseFloat(cost.replace('$', ''));
      } else {
          state.items.push({
              name,
              image,
              description,
              cost,
              quantity: 1,
              totalPrice: parseFloat(cost.replace('$', ''))
          });
      }

      state.totalQuantity++;
      state.totalAmount += parseFloat(cost.replace('$', ''));
    },

    removeItem: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // Update total quantity and amount before removing
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        // Remove item from array
        state.items = state.items.filter(item => item.name !== name);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity; // Calculate the difference in quantity
        existingItem.quantity = quantity; // Update item quantity
        existingItem.totalPrice = quantity * parseFloat(existingItem.cost.replace('$', '')); // Update item total price

        // Update cart totals
        state.totalQuantity += quantityDiff;
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    }
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
