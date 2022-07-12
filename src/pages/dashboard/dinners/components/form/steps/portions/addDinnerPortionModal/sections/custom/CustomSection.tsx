import React, { useEffect } from "react";

//form
import { useFieldArray, useFormContext, Control } from "react-hook-form";
import {
  getDinnerProduct,
  getDinnerProductQuery,
} from "services/getDinnerProducts";

//interfaces
import { IDinnerPortion } from "../../schema/dinnerPortion.schema";

//helpers
import { countTotal } from "helpers/countTotal";
import { sumTotal } from "helpers/sumTotal";

const CustomSection = () => {
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
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

  const portionDinnerProducts = watch(
    "dinnerProducts"
  ) as IDinnerPortion["dinnerProducts"];

  useEffect(() => {
    const total = sumTotal({
      dinnerPortionProducts: portionDinnerProducts as any,
    });
    return setValue("total", total);
  }, [...portionDinnerProducts.map(({ total }) => total)]);

  return (
    <div>
      {/* {JSON.stringify(watch())}{" "} */}
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={field.id}>
            <h2>wybrana porcja: {portionDinnerProducts[index].portion}</h2>
            <ul>
              składniki
              <li>kcal: {portionDinnerProducts[index].total.kcal}</li>
              <li>
                białko (g): {portionDinnerProducts[index].total.protein.gram}
              </li>
              <li>
                tłuszcze (g): {portionDinnerProducts[index].total.fat.gram}
              </li>
            </ul>

            <DinnerProduct
              fieldIndex={index}
              dinnerProductId={field.dinnerProductId}
            />
          </div>
        ))}
    </div>
  );
};

interface IDinnerProductProps {
  dinnerProductId: string;
  fieldIndex: number;
}

const DinnerProduct = ({
  dinnerProductId,
  fieldIndex,
}: IDinnerProductProps) => {
  // const { dinnerProduct, dinnerProductLoading, dinnerProductError } =
  //   getDinnerProduct(dinnerProductId);

  const {
    dinnerProductQuery,
    dinnerProductLoadingQuery,
    dinnerProductErrorQuery,
  } = getDinnerProductQuery(dinnerProductId);

  const { update } = useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
    name: "dinnerProducts",
  });

  const changePortion = (portion: number) => {
    console.log("changePortion");

    if (!dinnerProductQuery) return;

    update(fieldIndex, {
      dinnerProductId,
      portion,
      total: countTotal({
        product: dinnerProductQuery.product,
        portion,
      }) as any,
    }); //add count total
  };

  if (dinnerProductLoadingQuery) return <div>loading...</div>;
  if (dinnerProductErrorQuery) return <div>error..</div>;
  return (
    <div>
      <h2>produkt: {dinnerProductQuery?.product.name}</h2>{" "}
      <ul>
        <h3>porcje:</h3>{" "}
        {dinnerProductQuery?.portionsGram?.map((portion) => (
          <li onClick={() => changePortion(portion)} key={portion}>
            {portion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSection;
