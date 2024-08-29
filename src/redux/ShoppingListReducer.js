import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchShoppingItem: "",
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addShoppingItem(state, action) {
      state.items.push({
        ...action.payload,
        checkedOut: false,
      });
    },
    deleteShoppingItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateShoppingItem(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    checkoutShoppingItem(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].checkedOut = !state.items[index].checkedOut;
      }
    },
    setSearchShoppingItem(state, action) {
      state.searchShoppingItem = action.payload;
    },
  },
});

export const {
  addShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
  checkoutShoppingItem,
  setSearchShoppingItem,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;