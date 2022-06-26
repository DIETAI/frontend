import styled, { css } from "styled-components";

const EmptyGridWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6rem;
    width: 100%;
    min-height: 30rem;
    padding: 4rem;
    border-radius: ${border.rounded.md};
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    max-width: ${breakpoints.lg};

    img {
      width: 12rem;
      height: 12rem;
    }

    h3 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
    }

    ${down(breakpoints.lg)} {
      gap: 3rem;
    }

    ${down(breakpoints.sm)} {
      flex-direction: column;
      h3 {
        text-align: center;
      }
    }
  `
);

export { EmptyGridWrapper };
