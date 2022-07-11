import React, { ReactNode, useState, useEffect } from "react";
import {
  getDinnerProducts,
  getDinnerProductsQuery,
} from "services/getDinnerProducts";
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
import DefaultSection from "./sections/default/DefaultSection";
import CustomSection from "./sections/custom/CustomSection";
import EstablishmentSection from "./sections/establishment/EstablishmentSection";
import AllSection from "./sections/all/AllSection";

//interfaces
import { IDinnerPortionModalProps } from "./AddDinnerPortionModal.interfaces";

//form
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";

//schema
import { dinnerPortionSchema } from "./schema/dinnerPortion.schema";
import {
  getDinnerPortions,
  getDinnerPortionsQuery,
} from "services/getDinnerPortions";

//helpers
import { countTotal } from "helpers/countTotal";

const defaultDinnerPortionValues = dinnerPortionSchema.cast({});
type IDinnerPortionValues = typeof defaultDinnerPortionValues;

interface IPage {
  id: number;
  label: string;
  type: "default" | "custom" | "establishment" | "all";
  section: ReactNode;
}

const pages: IPage[] = [
  {
    id: 1,
    label: "domyślne zestawienie porcji",
    type: "default",
    section: <DefaultSection />,
  },
  {
    id: 2,
    label: "własne zestawienie porcji",
    type: "custom",
    section: <CustomSection />,
  },
  {
    id: 3,
    label: "zestawienie porcji według założeń",
    type: "establishment",
    section: <EstablishmentSection />,
  },
  {
    id: 4,
    label: "wszystkie zestawienia porcji",
    type: "all",
    section: <AllSection />,
  },
];

const AddDinnerPortionModal = ({ closeModal }: IDinnerPortionModalProps) => {
  const { dinnerId } = useParams();
  const [activePage, setActivePage] = useState(pages[0].type);
  const { dinnerPortions } = getDinnerPortions(dinnerId as string);
  // const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
  //   getDinnerProducts(dinnerId as string);
  const {
    dinnerProductsQuery,
    dinnerProductsLoadingQuery,
    dinnerProductsErrorQuery,
  } = getDinnerProductsQuery(dinnerId as string);

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

      // const total = {
      //   kcal: initialDinnerProducts.reduce(
      //     (acc, field) => acc + Number(field.total.kcal),
      //     0
      //   ),
      // };

      setValue("type", "custom");
      // setValue("total", total);
      setValue("dinnerProducts", initialDinnerProducts as any);
    }
  }, [dinnerProductsQuery]);

  const addPortion = (
    // data: IDinnerProductValues,
    e: BaseSyntheticEvent
  ) => {
    console.log({ e });
    e.preventDefault();
    e.stopPropagation();

    handleAddPortionSubmit(async (data) => {
      console.log("wysyłanie porcji");
      console.log(data);
      const dinnerPortionData = { ...data, dinnerId: dinnerId };
      try {
        const newDinnerPortion = await axios.post(
          "/api/v1/dinnerPortions",
          dinnerPortionData,
          {
            withCredentials: true,
          }
        );

        if (dinnerPortions) {
          await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}`, [
            ...dinnerPortions,
            newDinnerPortion.data,
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    })(e);

    closeModal();
  };

  if (dinnerProductsLoadingQuery) return <div>loading...</div>;
  if (dinnerProductsErrorQuery) return <div>error...</div>;
  if (!dinnerProductsQuery || dinnerProductsQuery.length < 1)
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
          dodanie nowego formularza i zliczanie makro z context
          {pages.find((page) => page.type === activePage)?.section}
          (zapisywanie kolekcji w bazie) (zapisywanie dinnerProducts w bazie)
          (zapisywanie obliczonych porcji w bazie) zapisz zestawienie porcji
          0/20
          <Button
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            type="submit"
          >
            zapisz zestawienie porcji w bazie 0/20
          </Button>
        </form>
      </FormProvider>
    </Styled.EstablishmentModalWrapper>
  );
};

export default AddDinnerPortionModal;
