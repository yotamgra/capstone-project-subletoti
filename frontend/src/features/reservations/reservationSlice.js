import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import reservationService from "./reservationService.js";

const initialState = {
  resevations: [],
  // singleReservation: null,
  // editForm: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get reservation by Id
export const getReservationById = createAsyncThunk(
  "reservation/getReservationById",
  async (reservationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.getReservationById(reservationId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Create new reservation
export const createReservation = createAsyncThunk(
  "reservation/create",
  async (reservationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await reservationService.createReservation(reservationData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Update reservation
export const updateReservation = createAsyncThunk(
  "reservation/update",
  async (reservationData, thunkAPI) => {
    try {
      console.log(reservationData);
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.updateReservation(reservationData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Delete reservation
export const deleteReservation = createAsyncThunk(
  "reservation/delete",
  async (reservationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.deleteReservation(reservationId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setEditForm: (state, action) => {
      let { disabledDates, disabledRanges } = action.payload;
      disabledDates = disabledDates.map((date) => dayjs(date).$d);
      disabledRanges = disabledRanges.map((range) => ({
        startDate: dayjs(range.startDate).$d,
        endDate: dayjs(range.endDate).$d,
      }));
      state.editForm = {
        ...action.payload,
        disabledDates: [...disabledDates],
        disabledRanges: [...disabledRanges],
      };
    },
    resetEditForm: (state) => {
      state.editForm = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //getReservationById
      .addCase(getReservationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReservationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleReservation = action.payload;
      })
      .addCase(getReservationById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //createReservation
      .addCase(createReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //deleteReservation
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reservations.find((reservation, index) => {
          if (reservation._id === action.payload.id) {
            state.reservations.splice(index, 1);
            return true;
          }
          return false;
        });
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //updateReservation
      .addCase(updateReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reservations.find((reservation, index) => {
          if (reservation._id === action.payload._id) {
            state.reservations.splice(index, 1, action.payload);
            return true;
          }
          return false;
        });
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset, setEditForm, resetEditForm } = reservationSlice.actions;
export default reservationSlice.reducer;
