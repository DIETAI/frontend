import React, { useEffect } from "react";
import { useParams } from "react-router";

//styles
import * as Styled from "./AllSection.styles";

//helpers
import { cartesianPortions } from "../../helpers/cartesianGroups.helper";

//query
import { getDinnerProductsQuery } from "services/getDinnerProducts";

//hooks
import { GeneratePortion } from "../../hooks/generatePortions.hook";

//components
import Portion from "./portion/Portion";

const AllSection = () => {
  const { dinnerId } = useParams();

  if (!dinnerId) return null;

  const {
    dinnerProductsQuery,
    dinnerProductsLoadingQuery,
    dinnerProductsErrorQuery,
  } = getDinnerProductsQuery(dinnerId);

  if (dinnerProductsLoadingQuery) return <div>loading...</div>;
  if (dinnerProductsErrorQuery) return <div>error...</div>;
  if (!dinnerProductsQuery) return null;

  const {
    error: generatedPortionsError,
    loading: generatedPortionsLoading,
    data: generatedPortions,
  } = GeneratePortion({ dinnerProductsQuery });

  // //hook
  // const generatePortionGroups = () => {
  //   console.log("generate");
  //   const allPortions = dinnerProductsQuery.map(({ portionsGram, _id }) =>
  //     portionsGram.map((portionGram) => ({
  //       portionGram,
  //       _id,
  //     }))
  //   );
  //   console.log(allPortions);

  //   const portions = cartesianPortions(...allPortions);

  //   console.log({ cartesianPortions: portions });
  // };

  // useEffect(() => {
  //   if (dinnerProductsQuery) {
  //     return generatePortionGroups();
  //   }

  //   return;
  // }, [dinnerProductsQuery]);

  console.log({ generatedPortions });

  if (generatedPortionsLoading) return <div>portions loading...</div>;
  if (generatedPortionsError) return <div>portions error...</div>;

  return (
    <>
      <h3>razem porcji: {generatedPortions?.length}</h3>
      <Styled.PortionGroupsWrapper>
        {generatedPortions?.length &&
          generatedPortions
            .slice(0, 10)
            .map((portion) => <Portion portion={portion} key={portion.uid} />)}
      </Styled.PortionGroupsWrapper>
    </>
  );
};

export default AllSection;
