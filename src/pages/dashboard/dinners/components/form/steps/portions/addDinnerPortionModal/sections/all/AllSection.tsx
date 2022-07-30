import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//styles
import * as Styled from "./AllSection.styles";

//helpers
import { cartesianPortions } from "../../helpers/cartesianGroups.helper";

//query
import { getDinnerProductsQuery } from "services/getDinnerProducts";

//hooks
import { GeneratePortion } from "../../hooks/generatePortions.hook";

//icons
import { FaFilter, FaChevronLeft, FaChevronRight } from "icons/icons";

//components
import Portion from "./portion/Portion";
import Establishment from "./establishment/Establishment";

const AllSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openEstablishmentOption, setOpenEstablishmentOption] = useState(false);
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
  if (!generatedPortions) return null;

  const pageCount = generatedPortions.length / 12;

  const handleBack = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pageCount) return;
    setCurrentPage(currentPage + 1);
  };

  const currentPageItems = generatedPortions.slice(
    (currentPage - 1) * 12,
    12 * currentPage
  );

  return (
    <>
      <Styled.PortionGroupsNav>
        <Styled.PortionGroupsFilterButton
          type="button"
          onClick={() => setOpenEstablishmentOption(!openEstablishmentOption)}
        >
          <FaFilter />
          filtruj według założeń
        </Styled.PortionGroupsFilterButton>
        <h3>
          ilość możliwych porcji: <b>{generatedPortions?.length}</b>
        </h3>
        {openEstablishmentOption && <Establishment />}
      </Styled.PortionGroupsNav>

      <Styled.PortionGroupsWrapper>
        {currentPageItems.map((portion, index) => (
          <Portion portion={portion} key={portion.uid} portionIndex={index} />
        ))}
      </Styled.PortionGroupsWrapper>
      {Math.round(pageCount) > 1 && (
        <Styled.PaginationOptionsWrapper>
          <Styled.PaginationOption
            type="button"
            onClick={handleBack}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Styled.PaginationOption>
          {Array(Math.round(pageCount))
            .fill(null)
            .map((_, index) => {
              return (
                <Styled.PaginationOption
                  type="button"
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Styled.PaginationOption>
              );
            })}
          <Styled.PaginationOption
            type="button"
            onClick={handleNext}
            disabled={currentPage === Math.round(pageCount)}
          >
            <FaChevronRight />
          </Styled.PaginationOption>
        </Styled.PaginationOptionsWrapper>
      )}
    </>
  );
};

export default AllSection;
