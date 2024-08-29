import { configureStore } from "@reduxjs/toolkit";
import cart from "features/cart/CartSlice";
import ui from "features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    cart,
    ui,
  },
});
