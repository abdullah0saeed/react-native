import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchData = createAsyncThunk(
  "global/fetchData",
  async (_, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const parentID = getState().auth.parentID;
    const sentData = JSON.stringify({
      unit: "1",
      lesson: "1",
      stadge: "1",
    });
    try {
      const res = await fetch(
        `http://192.168.1.2:3000/FSE/FSEtakeQuestion/${parentID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sentData,
        }
      );
      const data = await res.json();

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
      state.word_Pic = action.payload.question;
      console.log(state.word_Pic);
      console.log("fetch success");
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default globalSlice.reducer;
