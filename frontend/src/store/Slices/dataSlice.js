import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    values: false,
  },
  reducers: {
    setData: (state, action) => {
      return { ...state, values: action.payload };
    },    
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
