import styled, { css } from "styled-components";

import { IExportPopupStylesProps } from "./ExportPopup.interfaces";

const PopupContentHeading = styled.div(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    gap: 3rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.bold};
      color: ${palette.common.text};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
      background: ${palette.primary.light};
    }

    svg {
      width: 50%;
      height: 50%;
      path {
        fill: ${palette.primary.main};
      }
    }

    ${down(breakpoints.xs)} {
      gap: 1.5rem;
    }
  `
);

const PopupContentItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
`;

const PopupContentItem = styled.div<IExportPopupStylesProps>(
  ({
    theme: {
      palette,
      media: { breakpoints, down, up },
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    variant,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 60rem;
    min-height: 20rem;
    border-radius: 0.5rem;
    padding: 2rem;
    border: 4px solid rgba(189, 189, 189, 0.08);
    cursor: pointer;
    transition: 0.3s ease-out;
    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: ${palette.common.text};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
    }

    svg {
      width: 50%;
      height: 50%;
    }

    ${variant === "pdf" &&
    css`
      span {
        background: rgba(255, 0, 0, 0.22);
      }
      svg {
        path {
          fill: red;
        }
      }
    `}

    ${variant === "csv" &&
    css`
      span {
        background: rgba(0, 210, 34, 0.22);
      }
      svg {
        path {
          fill: #00d222;
        }
      }
    `}

     ${down(breakpoints.sm)} {
      a {
        flex-direction: column;
        text-align: center;
      }
    }
    ${down(breakpoints.xs)} {
      a {
        font-size: ${fontSize.xs};
      }
    }
  `
);

export { PopupContentHeading, PopupContentItemsWrapper, PopupContentItem };
