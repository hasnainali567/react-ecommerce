import { configureStore } from "@reduxjs/toolkit";
import UserReducers from '../Components/Features/UserSlice.js'
import ProductReducers from '../Components/Features/ProductsSlice.js'


const store = configureStore({
  reducer: {
    user: UserReducers,
    products: ProductReducers,
  },
});

export default store;