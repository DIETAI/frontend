import React, { useState, useEffect, useRef } from "react";

//interfaces
import { IDataGridPaginationProps } from "./DataGridPagination.interfaces";

//styles
import * as Styled from "./DataGridPagination.styles";

//icons
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "icons/icons";
import { AnimatePresence } from "framer-motion";

const paginateItemsPerPageOptions = [5, 10, 15, 20, 50, 75, 100];

const DataGridPagination = ({
  currentPage,
  pageCount,
  changePage,
  itemsPerPage,
  changeItemsPerPage,
}: IDataGridPaginationProps) => {
  const [openPaginateSelect, setOpenPaginateSelect] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    if (currentPage === 1) return;
    changePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage === pageCount) return;
    changePage(currentPage + 1);
  };

  const changeItems = (option: number) => {
    changePage(1);
    changeItemsPerPage(option);
    setOpenPaginateSelect(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node)) {
        setOpenPaginateSelect(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  console.log({ pageCount });

  return (
    <Styled.DataGridPaginationWrapper>
      <Styled.PaginateSelect ref={selectRef} openSelect={openPaginateSelect}>
        <input value={itemsPerPage} disabled />
        <span onClick={() => setOpenPaginateSelect(!openPaginateSelect)}>
          <FaChevronDown />
        </span>
        <AnimatePresence>
          {openPaginateSelect && (
            <Styled.PaginationSelectModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {paginateItemsPerPageOptions.map((option) => (
                <li key={option} onClick={() => changeItems(option)}>
                  {option}
                </li>
              ))}
            </Styled.PaginationSelectModal>
          )}
        </AnimatePresence>
      </Styled.PaginateSelect>

      {Math.round(pageCount) > 1 && (
        <Styled.PaginationOptionsWrapper>
          <Styled.PaginationOption
            onClick={handleBack}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Styled.PaginationOption>
          {Array(Math.ceil(pageCount))
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
            disabled={currentPage === Math.ceil(pageCount)}
          >
            <FaChevronRight />
          </Styled.PaginationOption>
        </Styled.PaginationOptionsWrapper>
      )}
    </Styled.DataGridPaginationWrapper>
  );
};

export default DataGridPagination;
