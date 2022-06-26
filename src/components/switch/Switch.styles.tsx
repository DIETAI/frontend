import styled, { css } from "styled-components";

interface IDarkMode {
  darkMode: boolean;
}

const SwitchWrapper = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 6rem;
    min-height: 2.8rem;
    border-radius: 2rem;
    background: ${palette.common.contrast};
    position: relative;
    cursor: pointer;
  `
);

const Switch = styled.div<IDarkMode>(
  ({ theme: { palette }, darkMode }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0.7rem;
    width: 2rem;
    height: 2rem;
    background: ${palette.common.main};
    transition: 0.3s ease-out;
    border-radius: 50%;
    svg {
      width: 60%;
      height: 60%;
      path {
        fill: ${palette.common.grey};
      }
    }
    ${darkMode &&
    css`
      transform: translateX(26px);
      svg {
        path {
          fill: ${palette.primary.main};
        }
      }
    `}
  `
);

export { SwitchWrapper, Switch };
