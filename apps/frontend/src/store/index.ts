import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
  },
});

export default store;

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
