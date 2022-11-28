import styled, { css } from "styled-components";

import { IButtonProps } from "./Button.interfaces";

const ButtonWrapper = styled.button<
  Pick<IButtonProps, "variant" | "fullWidth">
>(
  ({
    theme: {
      typography: { fontSize, fontWeight },
      palette,
      layout: { padding, border },
      media: { down, breakpoints },
    },
    variant,
    fullWidth,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 40rem;
    border-radius: ${border.rounded.sm};
    cursor: pointer;
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    transition: 0.3s ease-out;
    gap: 2rem;
    padding: 1rem 3rem;

    img {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
    }

    :hover {
      opacity: 0.8;
    }

    svg {
      width: 2rem;
      height: 2rem;
      path {
        fill: white;
      }
    }

    background: ${palette.primary.main};

    ${variant === "primary" &&
    css`
      color: white;
      border: none;
      border: 0.1rem solid ${palette.primary.main};
    `}

    ${variant === "delete" &&
    css`
      color: white;
      border: none;
      background: red;
    `}

    ${variant === "secondary" &&
    css`
      background: transparent;
      border: 0.1rem solid ${palette.primary.main};
      color: ${palette.primary.main};

      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}


    ${variant === "data-primary" &&
    css`
      background: ${palette.primary.main};
      color: white;
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      padding: 1rem 2rem;
      gap: 1.5rem;
      border: 0.1rem solid ${palette.primary.main};

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    `}


    ${variant === "data-secondary" &&
    css`
      background: ${palette.primary.light};
      color: ${palette.primary.main};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      padding: 1rem 2rem;
      gap: 1.5rem;
      border: 0.1rem solid ${palette.primary.light};

      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${variant === "data-third" &&
    css`
      background: transparent;
      color: ${palette.primary.main};
      font-size: 1.4rem;
      font-weight: ${fontWeight.medium};
      padding: 1rem 2rem;
      gap: 1.5rem;
      border: 0.1rem solid ${palette.primary.light};

      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: ${palette.primary.main};
        }
      }
    `}

    ${variant === "data-delete-primary" &&
    css`
      background: red;
      color: white;
      border: none;
      font-size: ${fontSize.xs};
      padding: 1rem 2rem;
      gap: 1.5rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: white;
        }
      }
    `};

    ${variant === "data-delete-secondary" &&
    css`
      background: rgba(255, 0, 0, 0.185);
      color: red;
      border: none;
      font-size: ${fontSize.xs};
      padding: 1rem 2rem;
      gap: 1.5rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
        path {
          fill: red;
        }
      }
    `}

    ${variant === "disabled" &&
    css`
      background: ${palette.primary.light};
      border: 1px solid rgba(119, 34, 255, 0.2);
      pointer-events: none;
      color: white;
    `}

    ${fullWidth &&
    css`
      width: 100%;
      max-width: 100%;
    `}

    ${down(breakpoints.sm)} {
      width: 100%;
    }
  `
);

export { ButtonWrapper };
