import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: {},
  customerInfo: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart({ products }, actions) {
      const product = actions.payload;
      const { sku } = product;
      if (sku in products) {
        products[sku].quantity++;
      } else {
        products[sku] = {
          sku: product.sku,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        };
      }
    },
    removeFromCart({ products }, actions) {
      const product = actions.payload;
      const { sku } = product;
      const quantity = products[sku].quantity;
      if (quantity > 1) products[sku].quantity--;
      else delete products[sku];
    },
    clear() {
      return initialState;
    },
    setCustomerInfo(state, actions) {
      const { field, value } = actions.payload;
      if (state.customerInfo) state.customerInfo = {};
      state.customerInfo[field] = value;
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clear, setCustomerInfo } =
  cartSlice.actions;
