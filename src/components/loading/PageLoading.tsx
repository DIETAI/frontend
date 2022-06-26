import React from "react";
import * as Styled from "./PageLoading.styles";

// //components
import ReactLoading from "react-loading";

const PageLoading = () => {
  return (
    <Styled.PageLoadingContainer>
      <ReactLoading type="spin" color="blue" height={80} width={80} />
    </Styled.PageLoadingContainer>
  );
};

export default PageLoading;
