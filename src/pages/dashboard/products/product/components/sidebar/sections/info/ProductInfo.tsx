import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";

import { getProduct } from "services/getProducts";

//styles
import * as Styled from "./ProductInfo.styles";

//modal
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";

const ProductInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productLoading) return <div>Product loading...</div>;
  if (productError || !product) return <div>Product error</div>;

  const deleteProduct = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/products/${product._id}`, {
        withCredentials: true,
      });

      console.log("usunięto produkt");
      handleAlert("success", "Dodano nowy produkt");
      navigate("/dashboard/products");
    } catch (e) {
      console.log("nie udało się usunąć produktu");
      handleAlert("error", "Usuwanie produktu nie powiodło się");
    }
  };

  return (
    <>
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
          onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
        >
          {t("formOptions.edit")}
        </Button>
        <Button
          fullWidth
          variant="data-delete-primary"
          onClick={() => setOpenDeleteModal(true)}
        >
          usuń
        </Button>

        <button>pobierz</button>
      </Styled.ProductInfoWrapper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteModalContent
          deleteItemName={product.name}
          deleteAction={deleteProduct}
        />
      </Modal>
    </>
  );
};

export default ProductInfo;
