import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "amr",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export default globalSlice.reducer;
