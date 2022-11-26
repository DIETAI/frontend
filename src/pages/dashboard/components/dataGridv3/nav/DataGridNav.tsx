import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//styles
import * as Styled from "./DataGridNav.styles";

//icons
import { FaFileExport, FaPlus, FaGripHorizontal, FaSearch } from "icons/icons";

//interfaces
import { IDataGridNavProps } from "./DataGridNav.interfaces";

//context
import { useDataGridSearch } from "../context/DataGridSearch.context";
import { useDataGridView } from "../context/DataGridViewProvider";

//components
import Button from "components/form/button/Button";

const DataGridNav = ({ addLink, exportAction }: IDataGridNavProps) => {
  const { searchValue, handleSearchValue } = useDataGridSearch();
  const { view, handleChangeView } = useDataGridView();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleSearchValue(e.currentTarget.value);
  };

  const changeView = () => {
    if (view === "line") return handleChangeView("package");
    return handleChangeView("line");
  };

  return (
    <Styled.DataGridNavWrapper>
      <Styled.SearchWrapper>
        <FaSearch />
        <input
          placeholder={t("dataGrid.search")}
          onChange={handleChange}
          value={searchValue}
        />
      </Styled.SearchWrapper>
      <Styled.ButtonsWrapper>
        <Button variant="data-third" onClick={changeView}>
          <FaGripHorizontal />
          Zmień widok
        </Button>
        {/* {exportAction && (
          <Button variant="data-secondary" onClick={exportAction}>
            <FaFileExport />
            Eksportuj
          </Button>
        )} */}

        {addLink && (
          <Button onClick={() => navigate(`${addLink}`)} variant="data-primary">
            <FaPlus />
            {t("dataGrid.add")}
          </Button>
        )}
      </Styled.ButtonsWrapper>
    </Styled.DataGridNavWrapper>
  );
};

export default DataGridNav;
