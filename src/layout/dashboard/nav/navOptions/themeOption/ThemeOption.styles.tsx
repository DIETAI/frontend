import styled, { css } from "styled-components";

const ThemeOptionWrapper = styled.div(
  ({
    theme: {
      palette,
      layout: { padding },
      typography: { fontSize, fontWeight },
      media: { down, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 20rem;
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

export { ThemeOptionWrapper };
