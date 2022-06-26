import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import Modal from "components/modal/Modal";
import AddProductModalContent from "./addProductModal/AddProductModal";

//styles
import * as Styled from "./Products.styles";

//form
import { useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";

const Products = () => {
  const { t } = useTranslation();
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

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
      name: "products",
    });

  const addProduct = () => {
    return append({
      productId: "",
      defaultAmount: 0,
      minAmount: 0,
      maxAmount: 0,
      portionsGram: [],
    });
  };

  const removeProduct = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <Styled.FieldWrapper key={field.id}>
            <Styled.FieldHeadWrapper>
              <Styled.FieldNumberWrapper>
                <p>{index + 1}</p>
              </Styled.FieldNumberWrapper>

              <Styled.IconOptionsWrapper>
                <Styled.IconButtonWrapper
                  iconType="edit"
                  type="button"
                  onClick={() => removeProduct(index)}
                >
                  <FaEdit />
                </Styled.IconButtonWrapper>
                <Styled.IconButtonWrapper
                  iconType="delete"
                  type="button"
                  onClick={() => removeProduct(index)}
                >
                  <FaTrash />
                </Styled.IconButtonWrapper>
              </Styled.IconOptionsWrapper>
            </Styled.FieldHeadWrapper>

            <Input
              label={`${t("dinner.form.products.productId")} *`}
              type="text"
              name={`products.${index}.productId`}
              fullWidth
              disabled
            />
            <Input
              label={`${t("dinner.form.products.defaultValue")} *`}
              type="number"
              name={`products.${index}.defaultAmount`}
              fullWidth
              disabled
            />
            <Input
              label={`${t("dinner.form.products.minAmount")} *`}
              type="text"
              name={`products.${index}.minAmount`}
              fullWidth
              disabled
            />
            <Input
              label={`${t("dinner.form.products.maxAmount")} *`}
              type="text"
              name={`products.${index}.maxAmount`}
              fullWidth
              disabled
            />
          </Styled.FieldWrapper>
        ))}

      <DashedSelect
        icon={<FaPlus />}
        text={t("dinner.form.products.addProduct")}
        onClick={() => setAddProductModalOpen(true)}
        fullWidth
      />

      <Modal
        onClose={() => setAddProductModalOpen(false)}
        open={addProductModalOpen}
      >
        <AddProductModalContent
          closeModal={() => setAddProductModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Products;
