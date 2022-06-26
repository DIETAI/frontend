import styled, { css } from "styled-components";

import { IDashedSelectProps } from "./DashedSelect.interfaces";

const DashedSelectWrapper = styled.div<Pick<IDashedSelectProps, "fullWidth">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    fullWidth,
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 40rem;
    transition: 0.3s ease-out;
    padding: 2rem;
    cursor: pointer;
    border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm};

    ${fullWidth &&
    css`
      max-width: 100%;
      width: 100%;
    `}

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 2.2rem;
        height: 2.2rem;
        path {
          fill: ${palette.common.slate};
        }
      }
    }

    p {
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
    }
  `
);

export { DashedSelectWrapper };
