import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (data, { rejectedWithValue }) => {
    const sendData = JSON.stringify(data);
    try {
      const res = await fetch(
        "https://gamebasedlearning.onrender.com/student/StudentLogIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: sendData,
        }
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
  initialState: { playerName: "", parentID: "" },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
      //.match(/\w+(?=\@)/i);
    },
  },
  extraReducers: {
    [checkUser.pending]: (state) => {
      state.loading = true;
      console.log("pending");
    },
    [checkUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.parentID = action.payload.student.studentParent;
      console.log(action.payload);
      console.log("success fetch");
    },
    [checkUser.rejected]: (state, action) => {
      state.loading = action.payload;
      console.log("failed fetch");
    },
  },
});

export const { setPlayerName } = authSlice.actions;
export default authSlice.reducer;
