import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { fetchPlants } from "../../api";
import { Plant } from "../../types";

export interface ErrorResponse {
  message: string;
}

export const fetchPlantsThunk = createAsyncThunk<
  Plant[],
  void,
  { rejectValue: ErrorResponse }
>("/plant", async (_, { rejectWithValue }) => {
  try {
    const plants = await fetchPlants();
    return plants;
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    }

    return rejectWithValue({ message: errorMessage });
  }
});
