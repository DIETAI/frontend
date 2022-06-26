import styled, { css } from "styled-components";

const DashboardWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    width: 100%;
  `
);

export { DashboardWrapper };
