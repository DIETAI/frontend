import styled, { css } from "styled-components";

const PageLoadingContainer = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: ${palette.common.main};
    transition: 0.3s ease-out;
  `
);

export { PageLoadingContainer };
