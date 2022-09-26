import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartesianResult } from "pages/dashboard/diets/editDiet/components/dietGenerateModal/helpers/cartesianDinners/cartesianDinners";
import { IDietMealTotal } from "interfaces/diet/dietMeals.interfaces";
import { IDietMealData } from "interfaces/diet/dietMeals.interfaces";

export interface IDietGenerateMeal {
  _id: string; //dietDayMealID to generate,
  name: string;
  type: "breakfast" | "second_breakfast" | "lunch" | "snack" | "dinner";
  generatedType: "new" | "added" | "addedChangePortion"; //or added or addedChangePortion,
  selectedGroup?: {
    type: string;
    name: string;
    description: string;
    macroTotalCount?: ICartesianResult["macroTotalCount"];
    missingProcentCount?: ICartesianResult["missingProcentCount"];
  };
  total: IDietMealTotal; //albo dodane już meal total albo przerobić generatedMacroTotalCount
  generatedDinners?: {
    _id: string;
    dinnerId: string;
    dinnerName: string;
    dinnerImage?: string;
    dinnerProducts: ICartesianResult["products"];
    total: {
      kcal: number;
      protein: {
        gram: number;
      };
      fat: {
        gram: number;
      };
      carbohydrates: {
        gram: number;
      };
    };
  }[];
  addedMealObj?: IDietMealData; //or undefined when new,
}

export interface IDietGenerateDay {
  _id: string;
  total: {
    kcal: number;
    protein: {
      gram: number;
    };
    fat: {
      gram: number;
    };
    carbohydrates: {
      gram: number;
    };
  };
  meals: IDietGenerateMeal[];
}

export interface IDietGenerate {
  generateDietLoading: boolean;
  generatedDays: IDietGenerateDay[];
}

const initialState: IDietGenerate = {
  generateDietLoading: false,
  generatedDays: [],
};

export const dietGenerateSlice = createSlice({
  name: "dietGenerate",
  initialState,
  reducers: {
    addDietGenerateAction: (state, action: PayloadAction<boolean>) => {
      state.generateDietLoading = action.payload;
    },
    addDietGenerate: (
      state,
      action: PayloadAction<IDietGenerate["generatedDays"]>
    ) => {
      state.generatedDays = action.payload;
    },
    removeDietGenerate: (state) => {
      state.generatedDays = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDietGenerateAction, addDietGenerate, removeDietGenerate } =
  dietGenerateSlice.actions;

export default dietGenerateSlice.reducer;
