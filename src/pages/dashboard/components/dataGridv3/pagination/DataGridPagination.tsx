import React, { useState } from "react";

//interfaces
import { IDataGridPaginationProps } from "./DataGridPagination.interfaces";

//styles
import * as Styled from "./DataGridPagination.styles";

//icons
import { FaChevronLeft, FaChevronRight } from "icons/icons";

const DataGridPagination = ({
  currentPage,
  pageCount,
  changePage,
}: IDataGridPaginationProps) => {
  const handleBack = () => {
    if (currentPage === 1) return;
    changePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pageCount) return;
    changePage(currentPage + 1);
  };

  return (
    <Styled.DataGridPaginationWrapper>
      <input placeholder="5" />
      <Styled.PaginationOptionsWrapper>
        <Styled.PaginationOption
          onClick={handleBack}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </Styled.PaginationOption>
        {Array(pageCount)
          .fill(null)
          .map((_, index) => {
            return (
              <Styled.PaginationOption
                key={index}
                active={currentPage === index + 1}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Styled.PaginationOption>
            );
          })}
        <Styled.PaginationOption
          onClick={handleNext}
          disabled={currentPage === pageCount}
        >
          <FaChevronRight />
        </Styled.PaginationOption>
      </Styled.PaginationOptionsWrapper>
    </Styled.DataGridPaginationWrapper>
  );
};

export default DataGridPagination;
