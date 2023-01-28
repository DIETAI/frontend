import React, { useState } from "react";
import { useParams } from "react-router";

//icons
import { FaUtensils } from "icons/icons";

//styles
import * as Styled from "./MealGenerateModal.styles";

//components
import Heading from "components/heading/Heading";

import * as Step from "./steps";
import { IDietMealPopulateData } from "interfaces/diet/dietPopulate.interfaces";
import axios from "axios";
import { getDietPopulate } from "services/getDiets";

type ActiveStep = "generateMealSettings" | "generatedMeal";

// generated meal from rust generate server
export interface IGeneratedMeal {
  select_type: String;
  name: String;
  description: String;
  meal: {
    missing_procent: {
      missing_kcal: number;
      missing_kcal_procent: number;
      missing_protein_gram: number;
      missing_fat_gram: number;
      missing_carbohydrates_gram: number;
      missing_protein_procent: number;
      missing_fat_procent: number;
      missing_carbohydrates_procent: number;
      missing_all_macro_procent_sum: number;
      protein_perfect_percentage_range: boolean;
      fat_perfect_percentage_range: boolean;
      carbohydrates_perfect_percentage_range: boolean;
    };
    total: {
      total_kcal: number;
      total_protein_gram: number;
      total_protein_kcal: number;
      total_protein_procent: number;
      total_fat_gram: number;
      total_fat_kcal: number;
      total_fat_procent: number;
      total_carbohydrates_gram: number;
      total_carbohydrates_kcal: number;
      total_carbohydrates_procent: number;
      total_fiber_gram: number;
      total_fiber_kcal: number;
      total_digestible_carbohydrates_gram: number;
      total_digestible_carbohydrates_kcal: number;
    };
    dinners: {
      _id: string; //dinnerId
      dinnerProducts: {
        _id: string; //dinnerProductId
        portion: number;
        product: {
          _id: string;
          name: string;
          imageURL: string;
        };
      }[];
    }[];
  };
}

interface IMealGenerateModalProps {
  meal: IDietMealPopulateData;
  closeModal: () => void;
}

const MealGenerateModal = ({ meal, closeModal }: IMealGenerateModalProps) => {
  const { dietEditId } = useParams();
  const { diet } = getDietPopulate(dietEditId as string);

  const [activeStep, setActiveStep] = useState<ActiveStep>(
    "generateMealSettings"
  );

  const [generatedMeal, setGeneratedMeal] = useState<IGeneratedMeal>();

  const generateMeal = async () => {
    console.log("generate meal");
    //if newMeal (recommendMeal) else generate meal (currentMeal._id)

    //set generate state

    //recommendMeal

    //rekomenduje meal id który jest przekazywany do generateMeal

    try {
      //wysyłać zapytanie z serwera express z authentication headers
      const generatedMeal = axios.get(
        `https://generate-server.dietai.pl/meal-generate?recommend_meal_id=${meal._id}&current_meal_establishment_id=${meal.establishmentMealId}&current_diet_establishment_id=${diet?.establishmentId}`
      );
      console.log({ generatedMeal });

      //set generated meal
    } catch (e) {
      console.log(e);
    }

    //generateMeal

    //setNewMealDinners
  };

  const addMealToDiet = async () => {
    console.log("add meal to diet");
  };

  return (
    <Styled.GenerateMealModalContainer>
      <Heading icon={<FaUtensils />} title="Generowanie posiłku" />
      <Styled.MealGenerateContentWrapper>
        {activeStep === "generateMealSettings" && (
          <Step.GenerateMealSettings
            mealDinnersLength={meal.dietDinners.length}
            closeModal={closeModal}
            generateMeal={generateMeal}
          />
        )}
        {activeStep === "generatedMeal" && (
          <Step.GeneratedMeal
            mealName={meal.name}
            closeModal={closeModal}
            generateMeal={generateMeal}
            addMealToDiet={addMealToDiet}
          />
        )}
      </Styled.MealGenerateContentWrapper>
    </Styled.GenerateMealModalContainer>
  );
};

export default MealGenerateModal;
