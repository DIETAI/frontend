import React from "react";
import { useTranslation } from "react-i18next";

//components
import Button from "components/form/button/Button";

//styles
import * as Styled from "./FilesLibraryNav.styles";

//context
import { useFileLibrary } from "layout/dashboard/context/fileLibrary.context";

//icons
import {
  FaSearch,
  FaGripHorizontal,
  FaGripLines,
  FaImages,
} from "react-icons/fa";

const FilesLibraryNav = ({
  onSubmitAction,
  searchValue,
  setSearchValue,
}: {
  onSubmitAction: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const { selectAssetId, selectedAssetId } = useFileLibrary();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <Styled.FilesLibraryNavWrapper>
      <Styled.FilesLibraryNavSearchWrapper>
        <FaSearch />
        <input
          placeholder={t("dataGrid.search")}
          onChange={handleChange}
          value={searchValue}
        />
      </Styled.FilesLibraryNavSearchWrapper>

      <Styled.FilesLibraryNavOptionsWrapper>
        <Styled.FilesLibraryNavOption>
          <FaGripLines />
        </Styled.FilesLibraryNavOption>
        <Styled.FilesLibraryNavOption>
          <FaGripHorizontal />
        </Styled.FilesLibraryNavOption>
        <Styled.FilesLibraryNavOption active={true}>
          <FaImages />
        </Styled.FilesLibraryNavOption>
      </Styled.FilesLibraryNavOptionsWrapper>

      <Button
        variant={!selectedAssetId ? "disabled" : "primary"}
        onClick={onSubmitAction}
      >
        dodaj zdjęcie
      </Button>
    </Styled.FilesLibraryNavWrapper>
  );
};

export default FilesLibraryNav;
