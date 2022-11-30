import styled, { css } from "styled-components";

const FilesLibraryContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `
);

const NavInfoWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
    }
  `
);

const NotFoundFilesWrapper = styled.div(
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
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-height: 50rem;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};
    padding: 1rem;

    img {
      width: 100%;
      height: 15rem;
      object-fit: contain;
    }

    ${up(breakpoints.xs)} {
      padding: 6rem;
      img {
        width: 15rem;
      }
    }
  `
);

const NotFoundFilesHeading = styled.div(
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
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin: 2rem 0;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;

      text-align: center;
    }

    p {
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      text-align: center;
      font-size: ${fontSize.s};
      text-align: center;
    }
  `
);

const FilesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
    min-height: 50rem;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};
    padding: 2rem;
  `
);

interface ISelectedImage {
  selected: boolean;
}

const ImageWrapper = styled.div<ISelectedImage>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    selected,
  }) => css`
    cursor: pointer;
    transition: 0.3s ease-out;
    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    ${selected &&
    css`
      img {
        border: 0.2rem dashed ${palette.primary.main};
        border-radius: ${border.rounded.sm};
      }
    `}
  `
);

export {
  FilesLibraryContainer,
  NotFoundFilesWrapper,
  NotFoundFilesHeading,
  FilesWrapper,
  ImageWrapper,
  NavInfoWrapper,
};
