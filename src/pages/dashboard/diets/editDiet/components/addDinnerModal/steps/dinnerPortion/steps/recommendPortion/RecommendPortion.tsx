import React, { useEffect, useState } from "react";
import * as Styled from "./RecommendPortion.styles";
import axios from "utils/api";

import { getDiet } from "services/getDiets";
import { getDietDayMeal } from "services/getDietMeals";
import { useDietEstablishment } from "services/useDietEstablishments";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";
import {
  getDinnerProductsQuery,
  getDinnerProductQuery,
} from "services/getDinnerProducts";
import { mutate } from "swr";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//interfaces
import { IDinnerProductQueryData } from "interfaces/dinner/dinnerProducts.interfaces";
import { ITotal } from "interfaces/total.interfaces";

//component
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";
import Image from "components/form/images/image/Image";
import MealTotal from "./mealTotal/MealTotal";
import IconButton from "components/iconButton/IconButton";

//icons
import { FaUtensils, FaTimes } from "react-icons/fa";

//form
import {
  useForm,
  FormProvider,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const roundValue = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};

interface IGeneratedPortion {
  uid: string;
  total: ITotal;
  dinnerProducts: {
    _id: string;
    portionGram: number;
    total: ITotal;
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

//schema
import {
  dinnerPortionSchema,
  IDinnerPortion,
} from "../newPortion/schema/newPortion.schema";

const defaultValues = dinnerPortionSchema.cast({});

type IDinnerPortionValues = typeof defaultValues;

const RecommendPortion = ({
  mealId,
  dietId,
  selectedDinnerId,
  closeRecommendPortionPopup,
  selectDinnerPortion,
}: {
  mealId: string;
  dietId: string;
  selectedDinnerId: string;
  closeRecommendPortionPopup: () => void;
  selectDinnerPortion: (dinnerPortionId: string) => void;
}) => {
  const { dinnerPortionsQuery } = getDinnerPortionsQuery(selectedDinnerId);
  const { dinnerProductsQuery } = getDinnerProductsQuery(selectedDinnerId);

  const [generatedPortionLoading, setGeneratedPortionLoading] = useState(false);
  const [generatedPortionError, setGeneratedPortionError] = useState("");
  const [generatedPortion, setGeneratedPortion] = useState<IGeneratedPortion>();

  const [establishmentToGeneratePortion, setEstablishmentToGeneratePortion] =
    useState<IEstablishmentToGeneratePortion>();

  const addDinnerPortionDefaultValues = {
    ...defaultValues,
    type: "custom",
  };

  const methods = useForm({
    resolver: yupResolver(dinnerPortionSchema),
    shouldUnregister: false,
    defaultValues: addDinnerPortionDefaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
    setValue,
  } = methods;

  const portionDinnerProducts = watch(
    "dinnerProducts"
  ) as IDinnerPortion["dinnerProducts"];

  // const mealId = watch("dietMealId") as string;
  // const dietId = watch("dietId") as string;
  // const dinnerId = watch("dinnerId") as string;
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
      const generatedDinnerPortion = await axios.post<IGeneratedPortion>(
        "/api/v1/dietDinnerPortionGenerate",
        {
          dietId: dietId,
          dinnerId: selectedDinnerId,
          mealEstablishment: { kcal: establishmentToGeneratePortion.kcal },
        },
        {
          withCredentials: true,
        }
      );

      console.log({ generatedDinnerPortion });

      if (generatedDinnerPortion.data) {
        const { total, dinnerProducts } = generatedDinnerPortion.data;
        const portionDinnerProducts = dinnerProducts.map((dinnerProduct) => ({
          dinnerProductId: dinnerProduct._id,
          portion: dinnerProduct.portionGram,
          total: dinnerProduct.total,
        }));

        setValue("type", "custom");
        setValue("uid", "custom1");
        setValue("total", total as any);
        setValue("dinnerProducts", portionDinnerProducts as any);
        trigger();
        return;
      }
      setGeneratedPortionError("Nie udało się wygenerować porcji");
    } catch (e) {
      console.log(e);
      setGeneratedPortionError("Nie udało się wygenerować porcji");
    }
    setGeneratedPortionLoading(false);
  };

  // const validPortion = () => {
  //   const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) =>
  //     portionQuery.dinnerProducts
  //       .map((product) =>
  //         (product.dinnerProductId + ":" + product.portion).trim()
  //       )
  //       .join("-")
  //   );
  //   const selectedProductsCombinationId = portionDinnerProducts
  //     .map((product) =>
  //       (product.dinnerProductId + ":" + product.portion).trim()
  //     )
  //     .join("-");

  //   if (allPortionsComb?.includes(selectedProductsCombinationId)) {
  //     return false;
  //   }

  //   return true;
  // };

  const validPortion = () => true;

  const onCreatePortionSubmit = async (data: IDinnerPortionValues) => {
    console.log("Create portion");
    const dinnerPortionData = { ...data, dinnerId: selectedDinnerId };
    try {
      const newDinnerPortion = await axios.post(
        "/api/v1/dinnerPortions",
        dinnerPortionData,
        {
          withCredentials: true,
        }
      );

      console.log({ newDinnerPortion });

      await mutate(`/api/v1/dinnerPortions/dinner/${selectedDinnerId}/query`);
      selectDinnerPortion(newDinnerPortion.data._id);
      closeRecommendPortionPopup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Styled.Container>
      <Styled.RecommendDinnerPortionWrapper>
        <button type="button" onClick={handleGeneratePortion}>
          generuj porcję
        </button>
        <FormProvider {...methods}>
          <Styled.FormWrapper autoComplete="off">
            {generatedPortionError && generatedPortionError}
            <Heading icon={<FaUtensils />} title="Generuj porcję" />
            <Styled.CloseButtonWrapper>
              <IconButton
                icon={<FaTimes />}
                onClick={closeRecommendPortionPopup}
              />
            </Styled.CloseButtonWrapper>

            <MealTotal />
            {!validPortion() && (
              <Styled.NotValidPortionWrapper>
                <h3 style={{ color: "red" }}>
                  Istnieje już taki zestaw porcji
                </h3>
              </Styled.NotValidPortionWrapper>
            )}
            <DinnerProducts />
            <Styled.ButtonWrapper>
              <Button
                type="button"
                onClick={handleSubmit(onCreatePortionSubmit as any) as any}
                variant={
                  isSubmitting || !isValid || !validPortion()
                    ? "disabled"
                    : "primary"
                }
              >
                stwórz porcję
              </Button>
            </Styled.ButtonWrapper>
          </Styled.FormWrapper>
        </FormProvider>

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
      </Styled.RecommendDinnerPortionWrapper>
    </Styled.Container>
  );
};

const DinnerProducts = () => {
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
      name: "dinnerProducts",
    });

  return (
    <Styled.ProductsContainer>
      {fields.length > 0 &&
        fields.map((dinnerProduct, index) => (
          <DinnerProduct
            key={dinnerProduct.dinnerProductId}
            fieldIndex={index}
            dinnerProductId={dinnerProduct.dinnerProductId}
          />
        ))}
    </Styled.ProductsContainer>
  );
};

interface IDinnerProductProps {
  dinnerProductId: IDinnerProductQueryData["_id"];
  fieldIndex: number;
}

interface ISelectedProductPortion {
  portion: number;
  total: ITotal;
}

const DinnerProduct = ({
  dinnerProductId,
  fieldIndex,
}: IDinnerProductProps) => {
  // const [selectedProductPortion, setSelectedProductPortion] =
  //   useState<ISelectedProductPortion>({
  //     portion: dinnerProduct.defaultAmount,
  //     total: countTotal({
  //       product: dinnerProduct.product,
  //       portion: dinnerProduct.defaultAmount,
  //     }),
  //   });

  const {
    dinnerProductQuery,
    dinnerProductLoadingQuery,
    dinnerProductErrorQuery,
  } = getDinnerProductQuery(dinnerProductId);

  const { update } = useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
    name: "dinnerProducts",
  });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  // const changePortion = (portion: number) => {
  //   const total = countTotal({ product: dinnerProduct.product, portion });
  //   setSelectedProductPortion({ portion, total });
  // };

  const selectedProductPortion = watch(
    `dinnerProducts.${fieldIndex}`
  ) as IDinnerPortion["dinnerProducts"][0];

  if (dinnerProductLoadingQuery) return <div>loading...</div>;
  if (dinnerProductErrorQuery) return <div>error..</div>;
  if (!dinnerProductQuery) return null;

  const changePortion = (portion: number) => {
    console.log("changePortion");

    update(fieldIndex, {
      dinnerProductId,
      portion,
      total: countTotal({
        product: dinnerProductQuery.product,
        portion,
      }) as any,
    }); //add count total
  };

  return (
    <Styled.ProductWrapper>
      <Styled.ProductMainWrapper>
        {dinnerProductQuery.product.image && (
          <div>
            <Image
              imageId={dinnerProductQuery.product.image}
              roundedDataGrid={true}
            />
          </div>
        )}
        <Styled.ProductContentWrapper>
          <h2>{dinnerProductQuery.product.name}</h2>
          <h3>
            wybrana porcja: <b>{selectedProductPortion.portion} g</b>{" "}
          </h3>
          <Styled.ProductTotalFeaturesWrapper>
            <Styled.ProductTotalFeature>
              Kcal: <b>{selectedProductPortion.total.kcal}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              B (g): <b>{selectedProductPortion.total.protein.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              T (g): <b>{selectedProductPortion.total.fat.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              W (g): <b>{selectedProductPortion.total.carbohydrates.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              Wp (g):{" "}
              <b>{selectedProductPortion.total.digestableCarbohydrates.gram}</b>
            </Styled.ProductTotalFeature>
            <Styled.ProductTotalFeature>
              Bł (g): <b>{selectedProductPortion.total.fiber.gram}</b>
            </Styled.ProductTotalFeature>
          </Styled.ProductTotalFeaturesWrapper>
          <h3>dostępne porcje:</h3>{" "}
          <Styled.ProductPortionsWrapper>
            {dinnerProductQuery.portionsGram.map((portion) => (
              <Styled.ProductPortionWrapper
                onClick={() => changePortion(portion)}
                key={portion}
                active={selectedProductPortion.portion === portion}
              >
                {portion}
              </Styled.ProductPortionWrapper>
            ))}
          </Styled.ProductPortionsWrapper>
        </Styled.ProductContentWrapper>
      </Styled.ProductMainWrapper>
      <Styled.ProductPortionItem>
        {selectedProductPortion.portion} g
      </Styled.ProductPortionItem>
    </Styled.ProductWrapper>
  );
};

export default RecommendPortion;
