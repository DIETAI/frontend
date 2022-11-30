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

//interfaces
import { View } from "../FilesLibrary";

const FilesLibraryNav = ({
  onSubmitAction,
  searchValue,
  setSearchValue,
  view,
  setView,
}: {
  onSubmitAction: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}) => {
  const { t } = useTranslation();
  const { selectAssetId, selectedAssetId } = useFileLibrary();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <Styled.FilesLibraryNavWrapper>
      <Styled.FilesLibraryNavOptionsWrapper>
        <Styled.FilesLibraryNavOption
          active={view === "line"}
          onClick={() => setView("line")}
        >
          <FaGripLines />
        </Styled.FilesLibraryNavOption>
        {/* <Styled.FilesLibraryNavOption>
          <FaGripHorizontal />
        </Styled.FilesLibraryNavOption> */}
        <Styled.FilesLibraryNavOption
          active={view === "image"}
          onClick={() => setView("image")}
        >
          <FaImages />
        </Styled.FilesLibraryNavOption>
      </Styled.FilesLibraryNavOptionsWrapper>
      <Styled.FilesLibraryNavSearchWrapper>
        <FaSearch />
        <input
          placeholder={t("dataGrid.search")}
          onChange={handleChange}
          value={searchValue}
        />
      </Styled.FilesLibraryNavSearchWrapper>

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
