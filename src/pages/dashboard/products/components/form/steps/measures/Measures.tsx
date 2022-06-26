import React from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./Measures.styles";

//form
import { useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";

const measures = [
  { id: 1, name: "porcja" },
  { id: 2, name: "sztuka" },
  { id: 3, name: "szklanka" },
  { id: 4, name: "łyżka" },
  { id: 5, name: "łyżeczka" },
  { id: 6, name: "garść" },
  { id: 7, name: "opakowanie" },
  { id: 8, name: "plaster" },
  { id: 9, name: "ząbek" },
  { id: 10, name: "kostka" },
];

const Measures = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "measures",
    });

  const addMeasure = () => {
    return append({ name: "", amount: 0 });
  };

  const removeMeasure = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.length > 1 &&
        fields.map((field, index) => (
          <Styled.FieldWrapper
            key={field.id}
            className="w-full flex flex-col gap-6 bg-slate-50 p-6 rounded-md relative lg:flex-row lg:items-center"
          >
            <Styled.FieldHeadWrapper>
              <Styled.FieldNumberWrapper>
                <p>{index + 1}</p>
              </Styled.FieldNumberWrapper>

              <Styled.IconOptionsWrapper>
                <Styled.IconButtonWrapper
                  iconType="edit"
                  type="button"
                  onClick={() => removeMeasure(index)}
                >
                  <FaEdit />
                </Styled.IconButtonWrapper>
                <Styled.IconButtonWrapper
                  iconType="delete"
                  type="button"
                  onClick={() => removeMeasure(index)}
                >
                  <FaTrash />
                </Styled.IconButtonWrapper>
              </Styled.IconOptionsWrapper>
            </Styled.FieldHeadWrapper>

            <Input
              label={`${t("product.form.measures.measure")} *`}
              type="text"
              name={`measures.${index}.name`}
              disabled
              fullWidth
            />
            <Input
              label={`${t("product.form.measures.quantity")} (g) *`}
              type="number"
              name={`measures.${index}.amount`}
              disabled
              fullWidth
            />
          </Styled.FieldWrapper>
        ))}

      <DashedSelect
        icon={<FaPlus />}
        text={t("product.form.measures.addMeasure")}
        onClick={addMeasure}
        fullWidth
      />
    </>
  );
};

export default Measures;
