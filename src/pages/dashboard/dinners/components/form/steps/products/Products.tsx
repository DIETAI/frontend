import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import axios from "utils/api";

//components
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

//interfaces
import { IDinnerProducts } from "../../../../schema/newDinner.schema";

//query
import { getDinnerProducts } from "services/getDinnerProducts";
import { getDinnerPortions } from "services/getDinnerPortions";
import { mutate } from "swr";
import { IDinnerProductData } from "interfaces/dinner/dinnerProducts.interfaces";
import { IProductData } from "interfaces/product.interfaces";

interface IDinnerProductsValues {
  products: IDinnerProducts["products"];
}

const Products = () => {
  const { t } = useTranslation();
  const { dinnerId } = useParams();
  const { dinnerProducts, dinnerProductsLoading, dinnerProductsError } =
    getDinnerProducts(dinnerId as string);

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

  if (dinnerProductsLoading) return <div>loading...</div>;
  if (dinnerProductsError || !dinnerProducts) return <div>error..</div>;

  return (
    <>
      {dinnerProducts.length > 0 &&
        dinnerProducts.map((dinnerProduct, index) => (
          <ProductField
            key={dinnerProduct._id}
            dinnerProducts={dinnerProducts}
            fieldIndex={index}
            dinnerProductId={dinnerProduct._id}
            product={dinnerProduct.productId}
            removeProduct={removeProduct}
            defaultAmount={dinnerProduct.defaultAmount}
            minAmount={dinnerProduct.minAmount}
            maxAmount={dinnerProduct.maxAmount}
            portionsGram={dinnerProduct.portionsGram}
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
  dinnerProductId: string;
  dinnerProducts: IDinnerProductData[];
  product: IProductData;
  removeProduct: (fieldIndex: number) => void;
  fieldIndex: number;
  defaultAmount: number;
  minAmount?: number;
  maxAmount?: number;
  portionsGram: number[];
}

const ProductField = ({
  dinnerProductId,
  product,
  removeProduct,
  fieldIndex,
  defaultAmount,
  minAmount,
  maxAmount,
  dinnerProducts,
  portionsGram,
}: IProductFieldProps) => {
  const { dinnerId } = useParams();

  const removeDinnerProduct = async () => {
    try {
      await axios.delete(`/api/v1/dinnerProducts/${dinnerProductId}`, {
        withCredentials: true,
      });

      await mutate(`/api/v1/dinnerProducts/dinner/${dinnerId}`);

      //dinnerPortions
      await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}`, []);

      console.log("usunięto produkt z posiłku");
    } catch (e) {
      console.log(e);
    }
  };

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
            onClick={removeDinnerProduct}
          >
            <FaTrash />
          </Styled.IconButtonWrapper>
        </Styled.IconOptionsWrapper>
      </Styled.FieldHeadWrapper>
      <Styled.ItemWrapper>
        <Styled.ItemContent>
          {product.image && (
            <Image imageId={product.image._id} roundedSelect={true} />
          )}
          <h2>{product.name}</h2>
        </Styled.ItemContent>
        <Styled.ItemFeatures>
          <Styled.ItemFeatureWrapper>
            <h3>domyślna ilość (g):</h3>
            <Styled.ItemFeature>{defaultAmount}</Styled.ItemFeature>
          </Styled.ItemFeatureWrapper>
          <Styled.ItemFeatureWrapper>
            <h3>minimalna ilość (g):</h3>
            <Styled.ItemFeature>{minAmount}</Styled.ItemFeature>
          </Styled.ItemFeatureWrapper>
          <Styled.ItemFeatureWrapper>
            <h3>maksymalna ilość (g):</h3>
            <Styled.ItemFeature>{maxAmount}</Styled.ItemFeature>
          </Styled.ItemFeatureWrapper>
        </Styled.ItemFeatures>
      </Styled.ItemWrapper>
    </Styled.FieldWrapper>
  );
};

export default Products;
