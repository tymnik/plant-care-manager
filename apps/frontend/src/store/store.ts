import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/slice";
import plantReducer from "./plant/slice";

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["token"],
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    plant: plantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
