import React, { ReactNode } from "react";
import { useParams } from "react-router";
import { getDinner } from "services/getDinners";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//styles
import * as Styled from "./DinnerContent.styles";

//icons
import { FaUtensils, FaWeight } from "icons/icons";

//components
import Image from "components/form/images/image/Image";
import * as DinnerStep from "./steps";

//interfaces
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";

const DinnerContent = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading</div>;
  if (!dinner || dinnerError) return <div>dinner error</div>;

  return (
    <Styled.DinnerContentWrapper>
      <DinnerStep.BasicInfo
        name={dinner.name}
        image={dinner.image}
        gallery={dinner.gallery}
      />
      {/* <DinnerStep.Products products={dinner.products} /> */}
    </Styled.DinnerContentWrapper>
  );
};

export default DinnerContent;
