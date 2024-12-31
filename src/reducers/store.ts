import { configureStore } from "@reduxjs/toolkit";
import { useDispatch} from 'react-redux';
import { storeReducer } from "./storeSlice";
import { productReducer } from "./productSlice";
import { authReducer } from "./authSlice";
import taskReducer from "./taskersSlice";
import weddingProductReducer from "./weddingSlice";
import weddingcategoryReducer from "./categorySlice";
import uiReducer from "./uiSlice";
import sidebarReducer from "./sidebarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    taskers: taskReducer,
    weddingProduct: weddingProductReducer,
    categories: weddingcategoryReducer,
    stores: storeReducer,
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

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
