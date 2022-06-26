import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//styles
import * as Styled from "./DataGridNav.styles";

//icons
import * as Icon from "icons/icons";

//interfaces
import { IDataGridNavProps } from "./DataGridNav.interfaces";

//components
import Button from "components/form/button/Button";

const DataGridNav = ({
  query,
  setQuery,
  data,
  linkPage,
  setExportPopupDisplay,
}: IDataGridNavProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Styled.DataGridNavWrapper>
      <Styled.SearchWrapper>
        <Icon.FaSearch />
        <input
          placeholder={t("dataGrid.search")}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </Styled.SearchWrapper>
      <Styled.ButtonsWrapper>
        {data.length > 0 && (
          <Button
            variant="data-secondary"
            onClick={() => setExportPopupDisplay(true)}
          >
            <Icon.FaFileExport />
            Eksportuj
          </Button>
        )}
        <Button onClick={() => navigate(`${linkPage}`)} variant="data-primary">
          <Icon.FaPlus />
          {t("dataGrid.add")}
        </Button>
      </Styled.ButtonsWrapper>
    </Styled.DataGridNavWrapper>
  );
};

export default DataGridNav;
