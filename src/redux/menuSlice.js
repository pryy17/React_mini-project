import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "products",
  initialState: {
    menus: [],
    categories: [],
  },
  reducers: {
    fetchData: (state, action) => {
      state.menus = action.payload.products;
      state.categories = action.payload.categories;

      console.log("ini menu", state.menus);
    },
  },
});

export const { fetchData } = menuSlice.actions;

export default menuSlice.reducer;
