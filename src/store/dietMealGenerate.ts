import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectGroupInfo } from "pages/dashboard/diets/editDiet/components/mealGenerateModal/helpers/selectGroups";
import { ICartesianResult } from "pages/dashboard/diets/editDiet/components/mealGenerateModal/helpers/cartesianDinners/cartesianDinners";

export interface IDietMealGenerate {
  dietMeal?: {
    _id: string;
    dayId: string;
    dietId: string;
  };
  selectedMealGroup?: {
    type: string;
    name: string;
    description: string;
    macroTotalCount: ICartesianResult["macroTotalCount"];
    missingProcentCount: ICartesianResult["missingProcentCount"];
  };
  mealDinners: {
    _id: string;
    dinnerId: string;
    dinnerName: string;
    dinnerProducts: ICartesianResult["products"];
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
      state.selectedMealGroup = action.payload.selectedMealGroup;
      state.mealDinners = action.payload.mealDinners;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDietMealGenerate } = dietMealGenerateSlice.actions;

export default dietMealGenerateSlice.reducer;
