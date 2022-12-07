import { configureStore } from "@reduxjs/toolkit";

import globalSlice from "./globalSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: { global: globalSlice,auth: authSlice},
});
