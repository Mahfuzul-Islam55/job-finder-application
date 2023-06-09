import { createAsyncThunk, createSlice, createStore } from "@reduxjs/toolkit";
import {
  ICreateJobType,
  IEditJobType,
  IInitialState,
  IJobType,
} from "./JobType";
import { addNewJob, deleteJob, editJobById, getAllJob } from "./JobAPI";

const initialState: IInitialState = {
  allJob: [],
  isLoading: false,
  isError: false,
  error: "",
  editJob: {},
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
interface params {
  id: number;
  data: IEditJobType;
}

export const changeJob = createAsyncThunk(
  "job/editJob",
  async ({ id, data }: params) => {
    const response = await editJobById(id, data);

    return response;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    searchAction: (state, action) => {
      state.allJob = state.allJob.filter((job) =>
        job.title.toLowerCase().includes(action.payload)
      );
    },
    filterIncrement: (state) => {
      state.allJob = state.allJob.sort((a, b) => (a.salary > b.salary ? 1 : 0));
    },
    filterDecrement: (state) => {
      state.allJob = state.allJob.sort((a, b) => (a.salary < b.salary ? 1 : 0));
    },
    editJobAction: (state, action) => {
      state.editJob = action.payload;
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
      })
      .addCase(changeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeJob.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = false);
        const index = state.allJob.findIndex(
          (job: ICreateJobType) => job.id === action.payload.id
        );
        state.allJob[index] = action.payload;
      })
      .addCase(changeJob.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
      });
  },
});

export default jobSlice.reducer;
export const { searchAction, filterDecrement, filterIncrement, editJobAction } =
  jobSlice.actions;
