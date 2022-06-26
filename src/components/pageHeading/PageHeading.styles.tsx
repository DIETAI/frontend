import styled, { css } from "styled-components";

const Container = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      media: { breakpoints, up },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  `
);

const HeadingWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 0.2rem;
    flex-direction: column;
    margin-bottom: 1rem;

    h2 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
      font-style: normal;
    }
  `
);

export { Container, HeadingWrapper };
