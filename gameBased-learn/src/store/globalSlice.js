import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchData = createAsyncThunk(
  "global/fetchData",
  async (_, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const parentID = getState().auth.parentID;
    const studentID = getState().auth.studentID;
    // const sentData = JSON.stringify({
    //   unit: "1",
    //   lesson: "1",
    //   stadge: "1",
    // });
    try {
      const res = await fetch(
        `https://gamebasedlearning-ot4m.onrender.com/Task/TakeTask/${studentID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: sentData,
        }
      );
      const data = await res.json();
      // console.log("tasks:", data);

      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const sendAttempts = createAsyncThunk(
  "global/sendAttempts",
  async (feedback, thunkAPI) => {
    const { rejectedWithValue, getState } = thunkAPI;
    const id = getState().auth.studentID;
    // const game_id = 1;
    const sentData = JSON.stringify({
      child_id: id,
      game_id: feedback.gameID,
      questions: feedback.questions,
    });
    try {
      const res = await fetch(
        `https://gamebasedlearning-ot4m.onrender.com/FSE/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sentData,
        }
      );
      const data = await res.json();
      console.log(data, "feedback:", sentData);
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
const initialState = {
  word_Pic: [],
  url: "https://gamebasedlearning-ot4m.onrender.com/",
  avatar: "https://assets2.lottiefiles.com/packages/lf20_lc46h4dr.json",
  error: null,
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
      //.match(/\w+(?=\@)/i);
    },
  },
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
    [sendAttempts.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { setAvatar } = globalSlice.actions;
export default globalSlice.reducer;
