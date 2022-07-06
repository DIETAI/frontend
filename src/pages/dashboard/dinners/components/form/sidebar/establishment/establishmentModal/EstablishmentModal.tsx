import React, { useState } from "react";

//styles
import * as Styled from "./EstablishmentModal.styles";

//form
import { useFormContext } from "react-hook-form";

//interfaces
import { IDinnerProducts } from "../../../../../schema/newDinner.schema";

//icons
import { FaUtensils } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import MealTotal from "./mealTotal/MealTotal";

interface IPage {
  id: number;
  label: string;
  type: "default" | "custom" | "establishment" | "all";
}

const pages: IPage[] = [
  { id: 1, label: "domyślne zestawienie porcji", type: "default" },
  { id: 2, label: "własne zestawienie porcji", type: "custom" },
  { id: 3, label: "zestawienie porcji według założeń", type: "establishment" },
  { id: 4, label: "wszystkie zestawienia porcji", type: "all" },
];

const EstablishmentModal = () => {
  const [activePage, setActivePage] = useState(pages[0].type);

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const dinnerProducts = watch("products") as IDinnerProducts["products"];

  if (dinnerProducts.length < 1) return <p>brak produktów</p>;

  // const addProductFormMethods = useForm({
  //   resolver: yupResolver(dinnerProductSchema),
  //   shouldUnregister: false,
  //   defaultValues: defaultDinnerProductValues,
  //   mode: "onBlur",
  // });

  // const { handleSubmit: handleAddProductSubmit } = addProductFormMethods;
  return (
    <Styled.EstablishmentModalWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Zestawienie porcji"
        // description={t("dinner.form.products.modal.description")}
      />
      {/* <FormProvider {...addProductFormMethods}>
        <form onSubmit={handleAddProductSubmit(addProduct)}>
          <AddProductFormContent />
        </form>
      </FormProvider> */}
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
      {dinnerProducts.map((dinnerProduct) => (
        <div key={dinnerProduct.productId}>
          <h2>{dinnerProduct.productId}</h2>
          <p>domyślna porcja: {dinnerProduct.defaultAmount} g</p>
        </div>
      ))}
      (zapisywanie kolekcji w bazie) (zapisywanie dinnerProducts w bazie)
      (zapisywanie obliczonych porcji w bazie) zapisz zestawienie porcji 0/20
    </Styled.EstablishmentModalWrapper>
  );
};

export default EstablishmentModal;
