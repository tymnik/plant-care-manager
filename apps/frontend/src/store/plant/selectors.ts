import { Plant } from "../../types";
import { RootState } from "../store";

export const selectPlants = (state: RootState): Plant[] => state.plant.plants;

export const selectIsLoading = (state: RootState): boolean =>
  state.plant.isLoading;

export const selectError = (state: RootState): string | null =>
  state.plant.error;
