import { combineReducers, configureStore } from "@reduxjs/toolkit";
import courseSlice from "./features/courseSlice";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisterConfig = {
  key: "root",
  version: 1,
  storage,
};

const routeReducer = combineReducers({
  course: courseSlice,
  cart: cartSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persisterConfig, routeReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persister = persistStore(store);
