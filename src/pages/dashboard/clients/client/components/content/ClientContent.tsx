import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import { getClient } from "services/getClients";

//styles
import * as Styled from "./ClientContent.styles";

//icons
import { FaUtensils, FaWeight, FaExclamationCircle } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import * as ClientStep from "./steps";
import LoadingGrid from "../loading/LoadingGrid";

//interfaces
import { IProductData } from "interfaces/product.interfaces";
import { AnimatePresence } from "framer-motion";

const ClientContent = () => {
  // const loadingSteps = Array(7).fill("");
  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;

  const { client, clientError, clientLoading } = getClient(clientId);

  return (
    <Styled.ClientContentWrapper>
      <ClientStep.BasicInfo />
      <ClientStep.Diseases />
      <ClientStep.Aims />
      <ClientStep.Interview />
    </Styled.ClientContentWrapper>
  );
};

export default ClientContent;
