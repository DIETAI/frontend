import styled, { css } from "styled-components";

import { ICheckedProps } from "./CheckboxWrapper.interfaces";

const CheckBox = styled.div<ICheckedProps>(
  ({ theme: { palette }, checked }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 50%;
    transition: 0.3s ease-out;
    cursor: pointer;
    z-index: 2;

    :hover {
      background: ${palette.common.contrast};
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;

      width: 1.8rem;
      height: 1.8rem;
      transition: 0.3s ease-out;
      border-radius: 0.2rem;

      border: 0.1rem solid ${palette.common.grey};

      svg {
        width: 80%;
        height: 80%;
        path {
          fill: white;
        }
      }
    }

    ${checked &&
    css`
      div {
        background: ${palette.primary.main};
        border: 0.1rem solid ${palette.primary.main};
      }
    `}
  `
);

export { CheckBox };
