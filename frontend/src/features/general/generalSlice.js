import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  edit: {
    isEdit: false,
    editForm: {},
  },
  isPostFormExpended: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    edit: (state, action) => {
      state.edit.isEdit = true;
      state.edit.editForm = action.payload;
    },
    resetEdit: (state) => {
      state.edit = initialState.edit;
    },
    expendPostForm: (state) => {
        console.log("reducer")
      state.isPostFormExpended = true;
    },
    restIsPostFormExpended: (state) => {
      state.isPostFormExpended = false;
    },
  },
});

export const { edit, resetEdit, expendPostForm, restIsPostFormExpended } =
  generalSlice.actions;
export default generalSlice.reducer;
