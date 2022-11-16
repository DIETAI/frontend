import React from "react";

//styles
import * as Styled from "./LoadingGrid.styles";

//context
import { useDarkMode } from "context/darkMode.context";

//components
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingGrid = ({
  columns,
  rows,
}: {
  columns?: number;
  rows?: number;
}) => {
  const { darkMode } = useDarkMode();
  const loadingRows = Array(rows || 5).fill("");
  const loadingRowSkeleton = Array(columns || 4).fill("");

  //rgba(226, 208, 255, 0.14)
  const skeletonDarkTheme = {
    baseColor: darkMode ? "#000000" : "rgba(226, 208, 255, 0.14)",
    highlightColor: darkMode ? "rgb(31, 31, 31)" : "rgba(119, 34, 255, 0.07)",
  };

  return (
    <Styled.LoadingWrapper>
      {loadingRows.map((_, index) => (
        <Styled.LoadingRow key={index}>
          {loadingRowSkeleton.map((_, index) => (
            <Styled.LoadingRowItem key={index}>
              <Skeleton {...skeletonDarkTheme} />
            </Styled.LoadingRowItem>
          ))}
        </Styled.LoadingRow>
      ))}
    </Styled.LoadingWrapper>
  );
};

export default LoadingGrid;
