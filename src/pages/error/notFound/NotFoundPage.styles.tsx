import styled, { css } from "styled-components";

const ErrorWrapper = styled.div(
  ({
    theme: {
      palette,
      typography,
      media: { up, breakpoints },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    min-height: 100vh;

    h1 {
      font-size: ${typography.fontSize.l};
      font-weight: ${typography.fontWeight.semibold};
      color: ${palette.common.text};
      text-align: center;
    }

    img {
      width: 100%;
    }

    ${up(breakpoints.sm)} {
      img {
        width: 400px;
      }
    }
  `
);

export { ErrorWrapper };
