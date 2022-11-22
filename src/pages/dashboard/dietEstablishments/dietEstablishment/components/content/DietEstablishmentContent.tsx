import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "services/getProducts";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import { getClient } from "services/getClients";

//styles
import * as Styled from "./DietEstablishmentContent.styles";

//icons
import { FaUtensils, FaWeight, FaExclamationCircle } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import * as DietEstablishmentStep from "./steps";
import LoadingGrid from "../loading/LoadingGrid";

//interfaces
import { IProductData } from "interfaces/product.interfaces";
import { AnimatePresence } from "framer-motion";
import { useDietEstablishment } from "services/useDietEstablishments";

const DietEstablishmentContent = () => {
  // const loadingSteps = Array(7).fill("");
  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;

  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  return (
    <Styled.DietEstablishmentContentWrapper>
      <DietEstablishmentStep.BasicInfo />
      <DietEstablishmentStep.Meals />
      <DietEstablishmentStep.Macrohydrates />
    </Styled.DietEstablishmentContentWrapper>
  );
};

export default DietEstablishmentContent;
