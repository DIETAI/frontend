import React, { useState } from "react";
import { useTranslation } from "react-i18next";

//components
import Input from "components/form/input/Input";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import Modal from "components/modal/Modal";
import AddProductModalContent from "./addProductModal/AddProductModal";
import Image from "components/form/images/image/Image";

//styles
import * as Styled from "./Products.styles";

//form
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";

//icons
import { FaTrash, FaPlus, FaEdit } from "icons/icons";
import { getProduct } from "services/getProducts";

//interfaces
import { IDinnerProducts } from "../../../../schema/newDinner.schema";

interface IDinnerProductsValues {
  products: IDinnerProducts["products"];
}

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
    useFieldArray<IDinnerProductsValues, "products", "id">({
      name: "products",
    });

  const removeProduct = (index: number) => {
    remove(index);
  };

  console.log({ fields });

  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <ProductField
            key={field.id}
            fieldIndex={index}
            productId={field.productId}
            removeProduct={removeProduct}
            defaultAmount={field.defaultAmount}
            minAmount={field.minAmount}
            maxAmount={field.maxAmount}
          />
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

interface IProductFieldProps {
  productId: string;
  removeProduct: (fieldIndex: number) => void;
  fieldIndex: number;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
}

const ProductField = ({
  productId,
  removeProduct,
  fieldIndex,
  defaultAmount,
  minAmount,
  maxAmount,
}: IProductFieldProps) => {
  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>loading...</div>;
  if (productError) return <div>error...</div>;

  return (
    <Styled.FieldWrapper>
      <Styled.FieldHeadWrapper>
        <Styled.FieldNumberWrapper>
          <p>{fieldIndex + 1}</p>
        </Styled.FieldNumberWrapper>

        <Styled.IconOptionsWrapper>
          <Styled.IconButtonWrapper
            iconType="edit"
            type="button"
            onClick={() => removeProduct(fieldIndex)}
          >
            <FaEdit />
          </Styled.IconButtonWrapper>
          <Styled.IconButtonWrapper
            iconType="delete"
            type="button"
            onClick={() => removeProduct(fieldIndex)}
          >
            <FaTrash />
          </Styled.IconButtonWrapper>
        </Styled.IconOptionsWrapper>
      </Styled.FieldHeadWrapper>
      <Styled.ItemWrapper>
        {product?.image && (
          <Image imageId={product.image} roundedSelect={true} />
        )}
        <Styled.ItemContent>
          <h2>{product?.name}</h2>
          {product?.description && <p> {product.description}</p>}
          <h3>domyślna ilość (g):</h3>
          <Styled.ItemFeature>{defaultAmount}</Styled.ItemFeature>
          <h3>minimalna ilość (g):</h3>
          <Styled.ItemFeature>{minAmount}</Styled.ItemFeature>
          <h3>maksymalna ilość (g):</h3>
          <Styled.ItemFeature>{maxAmount}</Styled.ItemFeature>
        </Styled.ItemContent>
      </Styled.ItemWrapper>
    </Styled.FieldWrapper>
  );
};

export default Products;
