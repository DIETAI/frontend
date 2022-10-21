import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "utils/api";
import { mutate } from "swr";
//form
import {
  useFieldArray,
  useFormContext,
  Control,
  FieldValues,
} from "react-hook-form";
import {
  getDinnerProduct,
  getDinnerProductQuery,
  getDinnerProductsQuery,
} from "services/getDinnerProducts";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getDinnerPortionsQuery } from "services/getDinnerPortions";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

//styles
import * as Styled from "./NewPortion.styles";

//interfaces
import { IDinnerProductQueryData } from "interfaces/dinner/dinnerProducts.interfaces";
import { ITotal } from "interfaces/total.interfaces";

//icons
import { FaUtensils } from "react-icons/fa";

//component
import Button from "components/form/button/Button";
import Heading from "components/heading/Heading";
import Image from "components/form/images/image/Image";
import MealTotal from "./mealTotal/MealTotal";

//schema
import {
  dinnerPortionSchema,
  IDinnerPortion,
} from "./schema/newPortion.schema";

const defaultValues = dinnerPortionSchema.cast({});

type IDinnerPortionValues = typeof defaultValues;

const NewPortion = ({
  selectedDinnerId,
  closeNewPortionPopup,
  selectDinnerPortion,
}: {
  selectedDinnerId: string;
  closeNewPortionPopup: () => void;
  selectDinnerPortion: (dinnerPortionId: string) => void;
}) => {
  const { dinnerPortionsQuery } = getDinnerPortionsQuery(selectedDinnerId);
  const { dinnerProductsQuery } = getDinnerProductsQuery(selectedDinnerId);

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

  useEffect(() => {
    if (dinnerProductsQuery && dinnerProductsQuery.length > 0) {
      const initialDinnerProducts = dinnerProductsQuery.map(
        (dinnerProduct) => ({
          dinnerProductId: dinnerProduct._id,
          portion: dinnerProduct.defaultAmount,
          total: countTotal({
            product: dinnerProduct.product,
            portion: dinnerProduct.defaultAmount,
          }),
        })
      );

      const total = sumTotal({
        dinnerPortionProducts: initialDinnerProducts,
      });

      setValue("type", "custom");
      setValue("total", total as any);
      setValue("dinnerProducts", initialDinnerProducts as any);
    }
  }, [dinnerProductsQuery]);

  const portionDinnerProducts = watch(
    "dinnerProducts"
  ) as IDinnerPortion["dinnerProducts"];

  useEffect(() => {
    const total = sumTotal({
      dinnerPortionProducts: portionDinnerProducts as any,
    }) as any;
    return setValue("total", total);
  }, [...portionDinnerProducts.map(({ total }) => total)]);

  if (!dinnerProductsQuery) return null;

  const validPortion = () => {
    const allPortionsComb = dinnerPortionsQuery?.map((portionQuery) =>
      portionQuery.dinnerProducts
        .map((product) =>
          (product.dinnerProductId + ":" + product.portion).trim()
        )
        .join("-")
    );
    const selectedProductsCombinationId = portionDinnerProducts
      .map((product) =>
        (product.dinnerProductId + ":" + product.portion).trim()
      )
      .join("-");

    // console.log({
    //   allPortionsComb,
    //   combination: selectedProductsCombinationId,
    // });

    if (allPortionsComb?.includes(selectedProductsCombinationId)) {
      return false;
    }

    return true;
  };

  console.log(validPortion());

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
      closeNewPortionPopup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Styled.Container>
      <Styled.AddDinnerPortionWrapper>
        <FormProvider {...methods}>
          <Styled.FormWrapper autoComplete="off">
            <Heading icon={<FaUtensils />} title="Nowa porcja" />
            <button onClick={closeNewPortionPopup} type="button">
              x
            </button>
            <MealTotal />
            {!validPortion() && (
              <h3 style={{ color: "red" }}>Istnieje już taki zestaw porcji</h3>
            )}
            <DinnerProducts />
            <Styled.ButtonWrapper>
              <Button
                type="button"
                onClick={handleSubmit(onCreatePortionSubmit) as any}
                variant={isSubmitting || !isValid ? "disabled" : "primary"}
              >
                stwórz porcję
              </Button>
            </Styled.ButtonWrapper>
          </Styled.FormWrapper>
        </FormProvider>
      </Styled.AddDinnerPortionWrapper>
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

export default NewPortion;
