import React from "react";

//form
import { useFieldArray, useFormContext, Control } from "react-hook-form";
import { getDinnerProduct } from "services/getDinnerProducts";

//interfaces
import { IDinnerPortion } from "../../schema/dinnerPortion.schema";

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

  const portionDinnerProducts = watch("dinnerProducts");

  return (
    <div>
      {/* {JSON.stringify(watch())}{" "} */}
      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={field.id}>
            <h2>wybrana porcja: {portionDinnerProducts[index].portion}</h2>
            <ul>
              składniki
              <li>kcal: {field.total.kcal}</li>
              <li>białko (g): {field.total.protein.gram}</li>
              <li>tłuszcze (g): {field.total.fat.gram}</li>
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
  const { dinnerProduct, dinnerProductLoading, dinnerProductError } =
    getDinnerProduct(dinnerProductId);

  const { update } = useFieldArray<IDinnerPortion, "dinnerProducts", "id">({
    name: "dinnerProducts",
  });

  const changePortion = (portion: number) => {
    console.log("changePortion");
    // update(fieldIndex, { dinnerProductId, portion, total: { kcal: 200 }  }); //add count total
  };

  if (dinnerProductLoading) return <div>loading...</div>;
  if (dinnerProductError) return <div>error..</div>;
  return (
    <div>
      <h2>produkt: {dinnerProduct?._id}</h2>{" "}
      <ul>
        <h3>porcje:</h3>{" "}
        {dinnerProduct?.portionsGram?.map((portion) => (
          <li onClick={() => changePortion(portion)} key={portion}>
            {portion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSection;
