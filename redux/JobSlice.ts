import { createAsyncThunk, createSlice, createStore } from "@reduxjs/toolkit";
import { IInitialState, IJobType } from "./JobType";
import { getAllJob } from "./JobAPI";

const initialState: IInitialState = {
  allJob: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchAllJob = createAsyncThunk("jobs/fetchAllJob", async () => {
  const response = await getAllJob();
  return response;
});

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJob.pending, (state) => {
        state.isLoading = true;
        state.allJob = [];
        state.isError = false;
      })
      .addCase(fetchAllJob.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = false);
        state.allJob = action.payload;
      })
      .addCase(fetchAllJob.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      });
  },
});

export default jobSlice.reducer;
