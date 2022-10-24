import { ITotal } from "interfaces/total.interfaces";
import React, { useEffect, useState } from "react";
import * as Styled from "../../DinnerPortion.styles";
import axios from "utils/api";

import { useFormContext } from "react-hook-form";
import { getDiet } from "services/getDiets";
import { getDietDayMeal } from "services/getDietMeals";
import { useDietEstablishment } from "services/useDietEstablishments";

//components
import Image from "components/form/images/image/Image";

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

interface IGeneratedPortion {
  uid: string;
  total: ITotal;
  dinnerProducts: {
    _id: string;
    name: string;
    portionGram: number;
    total: ITotal;
    product: {
      _id: string;
      name: string;
      assetId?: string;
      imageURL?: string;
    };
  }[];
}

//cartesianDinners

//   const proteinPerfectPercentageRange =
//     macroTotalCount.total_protein_procent >=
//       dietEstablishment.protein.min_procent &&
//     macroTotalCount.total_protein_procent <=
//       dietEstablishment.protein.max_procent;

interface IEstablishmentToGeneratePortion {
  kcal: number;
  //   protein: {
  //     minGram: number;
  //     maxGram: number;
  //     defaultGram: number;
  //   };
  //   fat: {
  //     minGram: number;
  //     maxGram: number;
  //     defaultGram: number;
  //   };
  //   carbohydrates: {
  //     minGram: number;
  //     maxGram: number;
  //     defaultGram: number;
  //   };
}

const RecommendPortion = () => {
  const [generatedPortionLoading, setGeneratedPortionLoading] = useState(false);
  const [generatedPortion, setGeneratedPortion] = useState<IGeneratedPortion>();

  const [establishmentToGeneratePortion, setEstablishmentToGeneratePortion] =
    useState<IEstablishmentToGeneratePortion>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const mealId = watch("dietMealId") as string;
  const dietId = watch("dietId") as string;
  const dinnerId = watch("dinnerId") as string;
  const { diet } = getDiet(dietId);

  if (!diet) return null;

  const { dietDayMeal: meal } = getDietDayMeal(mealId);
  const { dietEstablishment: establishment } = useDietEstablishment(
    diet.establishmentId
  );

  if (!meal || !establishment) return null;

  const mealEstablishment = establishment.meals.find(
    ({ _id }) => _id === meal.establishmentMealId
  );

  if (!mealEstablishment) return null;

  useEffect(() => {
    if (mealEstablishment) {
      const establishmentToGeneratePortionObj: IEstablishmentToGeneratePortion =
        {
          kcal: roundValue(mealEstablishment.kcal - meal.total.kcal),
        };

      setEstablishmentToGeneratePortion(establishmentToGeneratePortionObj);
    }
  }, [mealEstablishment]);

  const handleGeneratePortion = async () => {
    setGeneratedPortionLoading(true);
    console.log("generated");

    if (!establishmentToGeneratePortion) return;

    try {
      const generatedDinnerPortion = await axios.post(
        "/api/v1/dietDinnerPortionGenerate",
        {
          dietId: dietId,
          dinnerId: dinnerId,
          mealEstablishment: { kcal: establishmentToGeneratePortion.kcal },
        },
        {
          withCredentials: true,
        }
      );
      console.log({ generatedDinnerPortion });
    } catch (e) {
      console.log(e);
    }
    setGeneratedPortionLoading(false);
  };

  return (
    <div>
      <button type="button" onClick={handleGeneratePortion}>
        generuj porcję
      </button>
      {establishmentToGeneratePortion && (
        <Styled.PortionTotalFeaturesWrapper>
          <p>Brakująca ilość kcal do spełnienia założeń posiłku:</p>
          <Styled.PortionTotalFeature>
            Kcal: <b>{establishmentToGeneratePortion.kcal}</b>
          </Styled.PortionTotalFeature>
          {/* <Styled.PortionTotalFeature>
            B (g): <b>{establishmentToGeneratePortion.proteinGram}</b>
          </Styled.PortionTotalFeature>
          <Styled.PortionTotalFeature>
            T (g): <b>{establishmentToGeneratePortion.fatGram}</b>
          </Styled.PortionTotalFeature>
          <Styled.PortionTotalFeature>
            W (g): <b>{establishmentToGeneratePortion.carbohydratesGram}</b>
          </Styled.PortionTotalFeature>
          <Styled.PortionTotalFeature>
            Wp (g): <b>{generatedPortion.total.digestableCarbohydrates.gram}</b>
          </Styled.PortionTotalFeature>
          <Styled.PortionTotalFeature>
            Bł (g): <b>{generatedPortion.total.fiber.gram}</b>
          </Styled.PortionTotalFeature> */}
        </Styled.PortionTotalFeaturesWrapper>
      )}
      {/* {generatedPortion && (
        <Styled.PortionWrapper active={true}>
          <Styled.PortionHeadingWrapper>
            <Styled.PortionHeading>
              <Styled.FieldNumberWrapper>
                <p>1</p>
              </Styled.FieldNumberWrapper>
              <h2>wygenerowany zestaw porcji</h2>
            </Styled.PortionHeading>
          </Styled.PortionHeadingWrapper>
          <Styled.PortionTotalWrapper>
            <Styled.PortionTotalFeaturesWrapper>
              <Styled.PortionTotalFeature>
                Kcal: <b>{generatedPortion.total.kcal}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                B (g): <b>{generatedPortion.total.protein.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                T (g): <b>{generatedPortion.total.fat.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                W (g): <b>{generatedPortion.total.carbohydrates.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                Wp (g):{" "}
                <b>{generatedPortion.total.digestableCarbohydrates.gram}</b>
              </Styled.PortionTotalFeature>
              <Styled.PortionTotalFeature>
                Bł (g): <b>{generatedPortion.total.fiber.gram}</b>
              </Styled.PortionTotalFeature>
            </Styled.PortionTotalFeaturesWrapper>
          </Styled.PortionTotalWrapper>
          <Styled.ProductsWrapper>
            {generatedPortion.dinnerProducts.map((dinnerPortionProduct) => (
              <Styled.ProductWrapper key={dinnerPortionProduct._id}>
                <Styled.ProductMainWrapper>
                  {dinnerPortionProduct.product.assetId && (
                    <div>
                      <Image
                        roundedDataGrid={true}
                        imageId={dinnerPortionProduct.product.assetId}
                      />
                    </div>
                  )}

                  <Styled.ProductContentWrapper>
                    <h3>{dinnerPortionProduct.product.name}</h3>

                  
                  </Styled.ProductContentWrapper>
                </Styled.ProductMainWrapper>

                <Styled.ProductPortionItem>
                  {dinnerPortionProduct.portionGram} g
                </Styled.ProductPortionItem>
              </Styled.ProductWrapper>
            ))}
          </Styled.ProductsWrapper>
        </Styled.PortionWrapper>
      )} */}
    </div>
  );
};

export default RecommendPortion;
