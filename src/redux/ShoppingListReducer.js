import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentUserItems: JSON.parse(localStorage.getItem("currentUserItems")) || [],
  searchShoppingItem: "",
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setCurrentUserItems(state, action) {
      state.currentUserItems = action.payload;
      localStorage.setItem("currentUserItems", JSON.stringify(action.payload));
    },
    addShoppingItem(state, action) {
      state.currentUserItems.push({
        ...action.payload,
        checkedOut: false,
      });
      localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
    },
    deleteShoppingItem(state, action) {
      state.currentUserItems = state.currentUserItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
    },
    updateShoppingItem(state, action) {
      const index = state.currentUserItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.currentUserItems[index] = { ...state.currentUserItems[index], ...action.payload };
        localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
      }
    },
    checkoutShoppingItem(state, action) {
      const index = state.currentUserItems.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.currentUserItems[index].checkedOut = !state.currentUserItems[index].checkedOut;
        localStorage.setItem("currentUserItems", JSON.stringify(state.currentUserItems));
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
  setCurrentUserItems,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
