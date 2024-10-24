import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { fetchPlantsThunk } from "./thunks";
import { Plant } from "../../types";

export interface PlantState {
  plants: Plant[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PlantState = {
  plants: [],
  isLoading: false,
  error: null,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlantsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchPlantsThunk.fulfilled,
        (state, action: PayloadAction<Plant[]>) => {
          state.isLoading = false;
          state.plants = action.payload;
        }
      )
      .addCase(fetchPlantsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch plants"; // Handle the error properly
      });
  },
});

const plantReducer = plantSlice.reducer;

export default plantReducer;