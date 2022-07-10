import styled, { css } from "styled-components";

const ListNavWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
    },
  }) => css`
    display: flex;
    padding: 2rem 0;
    width: fit-content;
    border-bottom: 0.1rem dashed ${palette.common.border};
    position: relative;

    ${up(breakpoints.xl)} {
      width: 100%;
    }
  `
);

const ListNavItem = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    width: 30rem;

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: #b5b5c3;
      text-transform: uppercase;
      max-width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    ${up(breakpoints.xl)} {
      flex: 1;
      max-width: 40rem;
    }
  `
);

const ListNavConfig = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 8rem;
    z-index: 2;

    :last-of-type {
      justify-content: flex-end;
    }
  `
);

export { ListNavWrapper, ListNavItem, ListNavConfig };
