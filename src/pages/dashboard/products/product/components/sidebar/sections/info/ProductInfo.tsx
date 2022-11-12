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
import { AnimatePresence } from "framer-motion";

import { getProduct } from "services/getProducts";

//styles
import * as Styled from "./ProductInfo.styles";

//modal
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";

//icons
import { FaDownload, FaTrash, FaEdit } from "icons/icons";

//components
import LoadingGrid from "../../../loading/LoadingGrid";

const ProductInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productId } = useParams();
  console.log({ productId });

  if (!productId) return <div>not found</div>;
  const { product, productError, productLoading } = getProduct(productId);

  if (productError) return <div>Product error</div>;

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

  // return (
  //   <Styled.ProductInfoContainer>
  //     <Styled.ProductLoadingWrapper
  //       initial={{ opacity: 1 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       transition={{ duration: 0.3 }}
  //     >
  //       <LoadingGrid columns={2} rows={3} />
  //     </Styled.ProductLoadingWrapper>
  //   </Styled.ProductInfoContainer>
  // );

  return (
    <Styled.ProductInfoContainer>
      <AnimatePresence>
        {productLoading && (
          <Styled.ProductLoadingWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingGrid columns={2} rows={2} />
          </Styled.ProductLoadingWrapper>
        )}
      </AnimatePresence>
      {product && (
        <>
          <Styled.ProductInfoWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.ProductInfoItem>
              <h2>{t("formOptions.name")}: </h2>
              <p>{product.name}</p>
            </Styled.ProductInfoItem>
            <Styled.ProductInfoItem>
              <h2>{t("formOptions.created")}: </h2>{" "}
              <p>
                {format(new Date(product.createdAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.ProductInfoItem>
            <Styled.ProductInfoItem>
              <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
              <p>
                {format(new Date(product.updatedAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.ProductInfoItem>
            <Styled.ProductInfoOptionsWrapper>
              <Styled.ProductInfoOption
                optionType="edit"
                type="button"
                onClick={() =>
                  navigate(`/dashboard/products/edit/${product._id}`)
                }
              >
                <span>
                  <FaEdit />
                </span>
                edytuj
              </Styled.ProductInfoOption>
              {/* <Styled.ProductInfoOption optionType="download" type="button">
            <span>
              <FaDownload />
            </span>
            pobierz
          </Styled.ProductInfoOption> */}
              <Styled.ProductInfoOption
                optionType="delete"
                type="button"
                onClick={() => setOpenDeleteModal(true)}
              >
                <span>
                  <FaTrash />
                </span>
                usuń
              </Styled.ProductInfoOption>
            </Styled.ProductInfoOptionsWrapper>
          </Styled.ProductInfoWrapper>
          <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          >
            <DeleteModalContent
              deleteItemName={product.name}
              deleteAction={deleteProduct}
            />
          </Modal>
        </>
      )}
    </Styled.ProductInfoContainer>
  );
};

export default ProductInfo;
