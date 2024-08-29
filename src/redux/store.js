import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "../redux/ShoppingListReducer";
import userSlice from "../redux/UserAuthenticationReducer";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    userAuthentication: userSlice,
  },
});