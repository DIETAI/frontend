import styled, { css } from "styled-components";

const BasicInfoAvatarWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;
  `
);

export { BasicInfoAvatarWrapper };
