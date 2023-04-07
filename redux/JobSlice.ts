import { createAsyncThunk, createSlice, createStore } from "@reduxjs/toolkit";
import { ICreateJobType, IInitialState, IJobType } from "./JobType";
import { addNewJob, deleteJob, getAllJob } from "./JobAPI";

const initialState: IInitialState = {
  allJob: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchAllJob = createAsyncThunk(
  "jobs/fetchAllJob",
  async (type?: string) => {
    const response = await getAllJob(type);
    return response;
  }
);

export const createNewJob = createAsyncThunk(
  "jobs/createNewJob",
  async (data: ICreateJobType) => {
    const response = await addNewJob(data);
    return response;
  }
);

export const removeJob = createAsyncThunk(
  "job/removeJob",
  async (id: number) => {
    const response = await deleteJob(id);
    return response;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    searchAction: (state, action) => {
      console.log(action);
      state.allJob = state.allJob.filter((job) =>
        job.title.toLowerCase().includes(action.payload)
      );
    },
  },
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
      })
      .addCase(createNewJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createNewJob.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = false);
        state.allJob.push(action.payload);
      })
      .addCase(createNewJob.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = false);
        state.allJob = state.allJob.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      });
  },
});

export default jobSlice.reducer;
export const { searchAction } = jobSlice.actions;
