import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";

import { getProduct } from "services/getProducts";

//styles
import * as Styled from "./ProductInfo.styles";

const ProductInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>Product loading...</div>;
  if (productError || !product) return <div>Product error</div>;

  return (
    <Styled.ProductInfoWrapper>
      <Styled.ProductInfoItem>
        <h2>{t("formOptions.name")}: </h2>
        <p>{product.name}</p>
      </Styled.ProductInfoItem>
      <Styled.ProductInfoItem>
        <h2>{t("formOptions.created")}: </h2>{" "}
        <p>
          {format(new Date(product.createdAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.ProductInfoItem>
      <Styled.ProductInfoItem>
        <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
        <p>
          {format(new Date(product.updatedAt), "dd.MM.yyyy, hh:mm", {
            locale: pl,
          })}
        </p>
      </Styled.ProductInfoItem>
      <Button
        fullWidth
        onClick={() =>
          navigate(`/dashboard/diet-establishments/edit/${product._id}`)
        }
      >
        {t("formOptions.edit")}
      </Button>

      <button>pobierz</button>
    </Styled.ProductInfoWrapper>
  );
};

export default ProductInfo;
