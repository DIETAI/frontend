import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartesianResult } from "pages/dashboard/diets/editDiet/components/dietGenerateModal/helpers/cartesianDinners/cartesianDinners";

export interface IDietGenerate {
  generateDietLoading: boolean;
  days: {
    loading: boolean;
    error: boolean;
    generated: boolean;
    _id: string;
    name: string;
    dietId: string;
  }[];
  generatedDays: {
    loading: boolean;
    error: boolean;
    day: {
      _id: string;
      name: string;
      dietId: string;
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
      meals: {
        _id: string;
        name: string;
        type: string;
        selectedGroup: {
          type: string;
          name: string;
          description: string;
          macroTotalCount?: ICartesianResult["macroTotalCount"];
          missingProcentCount?: ICartesianResult["missingProcentCount"];
        };
        dinners: {
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
      }[];
    };
  }[];
}

const initialState: IDietGenerate = {
  generateDietLoading: false,
  days: [],
  generatedDays: [],
};

export const dietGenerateSlice = createSlice({
  name: "dietGenerate",
  initialState,
  reducers: {
    addDietGenerateAction: (state, action: PayloadAction<boolean>) => {
      state.generateDietLoading = action.payload;
    },
    //incorrect
    addDietGenerate: (
      state,
      action: PayloadAction<IDietGenerate["generatedDays"][0]>
    ) => {
      state.generatedDays = [...state.generatedDays, action.payload];
    },
    //correct
    addDietDaysGenerate: (
      state,
      action: PayloadAction<IDietGenerate["generatedDays"]>
    ) => {
      state.generatedDays = action.payload;
    },
    removeDietGenerate: (state) => {
      state.generatedDays = [];
    },
    addDaysGenerate: (state, action: PayloadAction<IDietGenerate["days"]>) => {
      state.days = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addDietGenerateAction,
  addDietGenerate,
  removeDietGenerate,
  addDaysGenerate,
  addDietDaysGenerate,
} = dietGenerateSlice.actions;

export default dietGenerateSlice.reducer;
