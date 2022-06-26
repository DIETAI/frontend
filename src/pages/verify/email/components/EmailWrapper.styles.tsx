import styled, { css } from "styled-components";

const EmailWrapper = styled.div(
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
    width: 90rem;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 1px solid ${palette.common.border};
    box-shadow: ${palette.common["box-shadow"]};
    gap: 2rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};
    z-index: 10;

    img {
      width: 100%;
      height: 20rem;
      object-fit: contain;
    }

    ${up(breakpoints.xs)} {
      padding: 6rem;
      img {
        width: 20rem;
      }
    }
  `
);

const EmailHeading = styled.div(
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

    h1 {
      font-size: ${fontSize.xl};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      text-align: center;
      text-align: left;
    }

    p {
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      text-align: center;
      font-size: 4vw;
      font-size: ${fontSize.s};
      text-align: left;
    }

    ${up(breakpoints.xs)} {
      p,
      h1 {
        text-align: center;
      }
    }
  `
);

export { EmailWrapper, EmailHeading };
