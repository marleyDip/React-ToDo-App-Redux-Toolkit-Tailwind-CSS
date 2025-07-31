import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all",
  isAddingTodo: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
