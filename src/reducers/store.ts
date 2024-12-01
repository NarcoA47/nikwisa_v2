import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { productReducer } from "./productSlice";
import taskReducer from "./taskersSlice";
import companyReducer from "./companySlice";
import weddingProductReducer from "./weddingSlice";
import weddingcategoryReducer from "./categorySlice";
import uiReducer from "./uiSlice";
import sidebarReducer from "./sidebarSlice";
import { storeReducer } from "./storeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    taskers: taskReducer,
    company: companyReducer,
    weddingProduct: weddingProductReducer,
    categories: weddingcategoryReducer,
    store: storeReducer,
    ui: uiReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AuthState = {
  user: {
    username: string;
  } | null;
};
