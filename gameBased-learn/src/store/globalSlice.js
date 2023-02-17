import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchData = createAsyncThunk(
  "global/fetchData",
  async (_, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const parentID = getState().auth.parentID;
    try {
      const res = await fetch(
        `http://192.168.1.2:3000/FSE/FSEtakeQuestion/${parentID}`
      );
      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const initialState = {
  word_Pic: [],
  error: null,
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData.pending]: (state) => {
      console.log("pending");
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.word_Pic = action.payload;
      console.log("fetch success");
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default globalSlice.reducer;
