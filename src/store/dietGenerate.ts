import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartesianResult } from "pages/dashboard/diets/editDiet/components/dietGenerateModal/helpers/cartesianDinners/cartesianDinners";

export interface IDietGenerate {
  generatedDays: {
    _id: string;
    name: string;
    dietId: string;
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
        dinnerProducts: ICartesianResult["products"];
      };
    }[];
  }[];
}

const initialState: IDietGenerate = {
  generatedDays: [],
};

export const dietGenerateSlice = createSlice({
  name: "dietGenerate",
  initialState,
  reducers: {
    addDietGenerate: (
      state,
      action: PayloadAction<IDietGenerate["generatedDays"][0]>
    ) => {
      state.generatedDays = [...state.generatedDays, action.payload];
    },
    removeDietGenerate: (state) => {
      state.generatedDays = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDietGenerate, removeDietGenerate } =
  dietGenerateSlice.actions;

export default dietGenerateSlice.reducer;
