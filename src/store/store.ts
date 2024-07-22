import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './CartSlice';
import orderReducer from './OrderSlice';
import pizzaReducer from './PizzaSlice';
import userReducer from './UserSlice';

const store = configureStore({
    reducer: {
      pizzaStore: pizzaReducer,
      cartStore: cartReducer,
      userStore: userReducer,
      orderStore: orderReducer
    },
});
  
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;