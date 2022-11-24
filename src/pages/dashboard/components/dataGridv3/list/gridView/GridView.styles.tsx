import styled, { css } from "styled-components";

const GridContainer = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    width: 100%;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 2rem 0;
  `
);

const GridItem = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, up },
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    min-height: 20rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      opacity: 0.8;
      h3 {
        color: ${palette.primary.main};
      }
    }

    ${up(breakpoints.sm)} {
      width: 20rem;
    }
  `
);

const GridItemImageWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 30rem;
    height: 30rem; */
    /* background: ${palette.common.contrast}; */

    padding: 2rem;
    position: relative;
    width: 100%;
    height: 15rem;

    .itemImg {
      /* width: 100%;
      height: 100%; */
      width: 100%;
      max-width: 10rem;
      max-height: 10rem;
      object-fit: cover;
      z-index: 1;
      border-radius: ${border.rounded.md};
    }

    .backgroundImg {
      /* width: 100%
      height: 100%; */
      width: 100%;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.08;
      filter: blur(3px);

      object-fit: cover;
      border-radius: ${border.rounded.md};
    }
  `
);

const GridItemContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    h3 {
      transition: 0.3s ease-out;
      text-align: center;
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

export {
  GridContainer,
  GridItem,
  GridItemImageWrapper,
  GridItemContentWrapper,
};
