import styled, { css } from "styled-components";

const MainLayoutContainer = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    position: relative;
  `
);

export { MainLayoutContainer };
