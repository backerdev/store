import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./services/store";
import storeReducer from "./features/storeSlice";
import navReducer from "./features/NavSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [storeApi.reducerPath]: storeApi.reducer,
    items: storeReducer,
    nav: navReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});
