import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ListWrapper = styled(motion.div)(
  () => css`
    width: 100%;
  `
);

const ListConfig = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 8rem;
    :last-of-type {
      justify-content: flex-end;
    }
    /* z-index: 2; */
  `
);

const ListConfigModalItem = styled.ul(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem 2rem;
    color: ${palette.common.text};
    font-size: 1.4rem;
    font-weight: ${fontWeight.medium};
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const RowsWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    border-radius: ${border.main};
    background: ${palette.common.main};
    /* z-index: 2; */
    width: 100%;

    ${down(breakpoints.xl)} {
      width: fit-content;
    }
  `
);

const Row = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    border-bottom: 1px dashed ${palette.common.contrast};
    padding: 1.5rem 0;
    min-height: 7rem;
    cursor: pointer;
    transition: 0.3s ease-out;
    justify-content: space-between;

    :hover {
      background: ${palette.common.contrast};
    }
  `
);

const RowItem = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    width: 30rem;

    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
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

const RowItemImageWrapper = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, up },
      typography: { fontSize, fontWeight },
    },
  }) => css`
    width: 4rem;
    height: 4rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: 50%;
    /* background: ${palette.primary.light}; */

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `
);

export {
  ListWrapper,
  ListConfig,
  ListConfigModalItem,
  RowsWrapper,
  Row,
  RowItem,
  RowItemImageWrapper,
};
