import React from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./Prices.styles";

//form
import { useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";

const currency = [
  { id: 1, name: "PLN" },
  { id: 2, name: "USD" },
  { id: 3, name: "EUR" },
];

const Prices = () => {
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
      name: "prices",
    });

  const addPrice = () => {
    return append({ shop: "", price: 0, currency: "PLN" });
  };

  const removePrice = (index: number) => {
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
                  onClick={() => removePrice(index)}
                >
                  <FaEdit />
                </Styled.IconButtonWrapper>
                <Styled.IconButtonWrapper
                  iconType="delete"
                  type="button"
                  onClick={() => removePrice(index)}
                >
                  <FaTrash />
                </Styled.IconButtonWrapper>
              </Styled.IconOptionsWrapper>
            </Styled.FieldHeadWrapper>

            <Input
              label={`${t("product.form.prices.shop")} *`}
              type="text"
              name={`prices.${index}.shop`}
              fullWidth
            />
            <Input
              label={`${t("product.form.prices.price")} *`}
              type="number"
              name={`prices.${index}.price`}
              fullWidth
            />
            <Input
              label={`${t("product.form.prices.currency")} *`}
              type="text"
              name={`prices.${index}.currency`}
              fullWidth
            />
          </Styled.FieldWrapper>
        ))}

      <DashedSelect
        icon={<FaPlus />}
        text={t("product.form.prices.addPrice")}
        onClick={addPrice}
        fullWidth
      />
    </>
  );
};

export default Prices;
