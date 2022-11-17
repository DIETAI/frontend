import React from "react";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import NoImage from "assets/noImage.svg";
import { getClient } from "services/getClients";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as StepStyled from "../../ClientContent.styles";
import * as Styled from "./Interview.styles";

//components
import Image from "components/form/images/image/Image";
import LoadingGrid from "../../../loading/LoadingGrid";

//icons
import {
  FaInfoCircle,
  FaExclamationCircle,
  FaClipboardList,
} from "icons/icons";

import LogoBackground from "assets/logo-icon.svg";
import { IClientData } from "interfaces/client.interfaces";
import { IProductData } from "interfaces/product.interfaces";
import { getProducts } from "services/getProducts";

const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const renderProduct = (
  productId: IProductData["_id"],
  products: IProductData[]
) => {
  const product = products.find(({ _id }) => _id === productId);

  return product?.name;
};

const Interview = () => {
  const { products, productsLoading, productsError } = getProducts();

  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;
  const { client, clientError, clientLoading } = getClient(clientId);

  if (clientError || productsError)
    return (
      <StepStyled.ClientStepWrapper>
        <StepStyled.StepHeadingWrapper>
          <StepStyled.IconWrapper>
            <FaClipboardList />
          </StepStyled.IconWrapper>
          <h2>Wywiad żywieniowy</h2>
        </StepStyled.StepHeadingWrapper>
        <StepStyled.ErrorWrapper>
          <FaExclamationCircle />
          <h3>Brak danych</h3>
        </StepStyled.ErrorWrapper>
      </StepStyled.ClientStepWrapper>
    );

  return (
    <StepStyled.ClientStepWrapper>
      <StepStyled.StepHeadingWrapper>
        <StepStyled.IconWrapper>
          <FaClipboardList />
        </StepStyled.IconWrapper>
        <h2>Wywiad żywieniowy</h2>
      </StepStyled.StepHeadingWrapper>
      <StepStyled.ClientStepContentContainer>
        <AnimatePresence>
          {clientLoading ||
            (productsLoading && (
              <StepStyled.ClientLoadingWrapper
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingGrid rows={4} />
              </StepStyled.ClientLoadingWrapper>
            ))}
        </AnimatePresence>
        {client && products && (
          <StepStyled.ClientStepContentWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <StepStyled.ClientItem>
              <h2>pal: </h2>
              <p>{client.pal}</p>
            </StepStyled.ClientItem>
            <Styled.ClientListItem>
              <Styled.ClientListNavItem>
                lubiane produkty
              </Styled.ClientListNavItem>

              {client.likedProducts && client.likedProducts.length > 0 ? (
                client.likedProducts.map((product) => (
                  <li key={product}> {renderProduct(product, products)}</li>
                ))
              ) : (
                <p>brak</p>
              )}
            </Styled.ClientListItem>

            <Styled.ClientListItem>
              <Styled.ClientListNavItem>
                nielubiane produkty
              </Styled.ClientListNavItem>

              {client.dislikedProducts && client.dislikedProducts.length > 0 ? (
                client.dislikedProducts.map((product) => (
                  <li key={product}> {renderProduct(product, products)}</li>
                ))
              ) : (
                <p>brak</p>
              )}
            </Styled.ClientListItem>
          </StepStyled.ClientStepContentWrapper>
        )}
      </StepStyled.ClientStepContentContainer>
    </StepStyled.ClientStepWrapper>
  );
};

export default Interview;
