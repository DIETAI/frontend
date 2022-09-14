import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDietMealGenerate {
  dietMeal?: {
    _id: string;
    dayId: string;
    dietId: string;
  };
  mealDinners: {
    _id: string;
    dinnerId: string;
    dinnerName: string;
  }[];
}

const initialState: IDietMealGenerate = {
  mealDinners: [],
};

export const dietMealGenerateSlice = createSlice({
  name: "dietMealGenerate",
  initialState,
  reducers: {
    addDietMealGenerate: (state, action: PayloadAction<IDietMealGenerate>) => {
      state.dietMeal = action.payload.dietMeal;
      state.mealDinners = action.payload.mealDinners;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDietMealGenerate } = dietMealGenerateSlice.actions;

export default dietMealGenerateSlice.reducer;
