import React, { ReactNode, useState, useEffect } from "react";
import { getDinnerProducts } from "services/getDinnerProducts";
import { useParams } from "react-router";
import { BaseSyntheticEvent } from "react";
import axios from "utils/api";

//styles
import * as Styled from "./AddDinnerPortionModal.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import MealTotal from "./mealTotal/MealTotal";
import Button from "components/form/button/Button";

//sections
import CustomSection from "./sections/custom/CustomSection";
import AllSection from "./sections/all/AllSection";

//interfaces
import { IDinnerPortionModalProps } from "./AddDinnerPortionModal.interfaces";

//form
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";

//schema
import { dinnerPortionSchema } from "./schema/dinnerPortion.schema";
import { getDinnerPortions } from "services/getDinnerPortions";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

const defaultDinnerPortionValues = dinnerPortionSchema.cast({});
type IDinnerPortionValues = typeof defaultDinnerPortionValues;

interface IPage {
  id: number;
  label: string;
  type: "default" | "custom" | "establishment" | "all";
  section: ReactNode;
}

const pages: IPage[] = [
  // {
  //   id: 1,
  //   label: "domyślne zestawienie porcji",
  //   type: "default",
  //   section: <DefaultSection />,
  // },
  {
    id: 1,
    label: "stwórz zestawienie porcji",
    type: "custom",
    section: <CustomSection />,
  },
  // {
  //   id: 2,
  //   label: "zestawienie porcji według założeń",
  //   type: "establishment",
  //   section: <EstablishmentSection />,
  // },
  {
    id: 2,
    label: "wszystkie możliwe zestawienia porcji",
    type: "all",
    section: <AllSection />,
  },
];

const AddDinnerPortionModal = ({ closeModal }: IDinnerPortionModalProps) => {
  const { dinnerId } = useParams();
  const [activePage, setActivePage] = useState(pages[0].type);
  // const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
  //   getDinnerProducts(dinnerId as string);
  const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
    getDinnerProducts(dinnerId as string);

  const addPortionFormMethods = useForm({
    resolver: yupResolver(dinnerPortionSchema),
    shouldUnregister: false,
    defaultValues: defaultDinnerPortionValues,
    mode: "onBlur",
  });

  const {
    handleSubmit: handleAddPortionSubmit,
    formState: { isValid, isSubmitting },
    setValue,
  } = addPortionFormMethods;

  useEffect(() => {
    if (dinnerProducts && dinnerProducts.length > 0) {
      const initialDinnerProducts = dinnerProducts.map((dinnerProduct) => ({
        dinnerProductId: dinnerProduct._id,
        portion: dinnerProduct.defaultAmount,
        total: countTotal({
          product: dinnerProduct.productId,
          portion: dinnerProduct.defaultAmount,
        }),
      }));

      const total = sumTotal({
        dinnerPortionProducts: initialDinnerProducts as any,
      });

      setValue("type", "custom");
      setValue("total", total as any);
      setValue("dinnerProducts", initialDinnerProducts as any);
    }
  }, [dinnerProducts]);

  const addPortion = (
    // data: IDinnerProductValues,
    e: BaseSyntheticEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    handleAddPortionSubmit(async (data) => {
      const dinnerPortionData = { ...data, dinnerId: dinnerId };
      try {
        const newDinnerPortion = await axios.post(
          "/api/v1/dinnerPortions",
          dinnerPortionData,
          {
            withCredentials: true,
          }
        );

        await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}`);
      } catch (e) {
        console.log(e);
      }
    })(e);

    closeModal();
  };

  if (dinnerProductsLoading) return <div>loading...</div>;
  if (dinnerProductsError) return <div>error...</div>;
  if (!dinnerProducts || dinnerProducts.length < 1)
    return <p>brak produktów</p>;

  return (
    <Styled.EstablishmentModalWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Zestawienie porcji"
        // description={t("dinner.form.products.modal.description")}
      />
      <FormProvider {...addPortionFormMethods}>
        <form onSubmit={addPortion}>
          <Styled.EstablishmentModalNav>
            {pages.map((page) => (
              <Styled.EstablishmentModalNavItem
                onClick={() => setActivePage(page.type)}
                key={page.id}
                active={activePage === page.type}
              >
                {page.label}
              </Styled.EstablishmentModalNavItem>
            ))}
          </Styled.EstablishmentModalNav>
          <MealTotal />
          {pages.find((page) => page.type === activePage)?.section}

          <Button
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            type="submit"
          >
            zapisz zestawienie porcji
          </Button>
        </form>
      </FormProvider>
    </Styled.EstablishmentModalWrapper>
  );
};

export default AddDinnerPortionModal;
