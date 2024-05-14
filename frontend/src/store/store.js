import { configureStore } from "@reduxjs/toolkit";
import socketSlice from "./Slices/socketSlice";

export default configureStore({
  reducer: {
    socket:socketSlice,    
  },
});

