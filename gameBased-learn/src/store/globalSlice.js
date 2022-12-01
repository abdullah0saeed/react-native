import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "global/fetchData",
  async (_, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://638786bed9b24b1be3f33c0f.mockapi.io/gameBaseLearn/data/wordpicData"
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
      state.word_Pic = action.payload;
       console.log("fetch success");

    },
    [fetchData.rejected]: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default globalSlice.reducer;
