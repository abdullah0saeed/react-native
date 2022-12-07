import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (_, thunkAPI) => {
    const { rejectedWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://638fac8b4bfe20f70ad77025.mockapi.io/CRUDS/React/users"
      );
      let data = await res.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { playerName: "" },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
  },
  extraReducers: {
    [checkUser.pending]: (state) => {
      state.loading = true;
      console.log("pending");
    },
    [checkUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("success fetch");
    },
    [checkUser.rejected]: (state, action) => {
      state.loading = action.payload;
      console.log("field fetch");
    },
  },
});


export const { setPlayerName } = authSlice.actions;
export default authSlice.reducer;