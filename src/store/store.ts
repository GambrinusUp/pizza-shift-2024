import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from './PizzaSlice';

const store = configureStore({
    reducer: {
      pizzaStore: pizzaReducer,
    },
});
  
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;