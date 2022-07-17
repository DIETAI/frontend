import React, { useState } from "react";

//interfaces
import { IDataGridPaginationProps } from "./DataGridPagination.interfaces";

//styles
import * as Styled from "./DataGridPagination.styles";

//icons
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "icons/icons";

const paginateItemsPerPageOptions = [5, 10, 15, 20, 50, 75, 100];

const DataGridPagination = ({
  currentPage,
  pageCount,
  changePage,
  itemsPerPage,
  changeItemsPerPage,
}: IDataGridPaginationProps) => {
  const [openPaginateSelect, setOpenPaginateSelect] = useState(false);

  const handleBack = () => {
    if (currentPage === 1) return;
    changePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pageCount) return;
    changePage(currentPage + 1);
  };

  const changeItems = (option: number) => {
    changeItemsPerPage(option);
    setOpenPaginateSelect(false);
  };

  return (
    <Styled.DataGridPaginationWrapper>
      <Styled.PaginateSelect>
        <input value={itemsPerPage} disabled />
        <span onClick={() => setOpenPaginateSelect(!openPaginateSelect)}>
          <FaChevronDown />
        </span>
        {openPaginateSelect && (
          <Styled.PaginationSelectModal>
            {paginateItemsPerPageOptions.map((option) => (
              <li key={option} onClick={() => changeItems(option)}>
                {option}
              </li>
            ))}
          </Styled.PaginationSelectModal>
        )}
      </Styled.PaginateSelect>

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
