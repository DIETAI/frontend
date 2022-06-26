import styled, { css } from "styled-components";

const ImagesContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }
  `
);

const ImagesWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    /* padding: 2rem; */
    /* border: 0.1rem dashed ${palette.common.slate};
    border-radius: ${border.rounded.sm}; */
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
  `
);

export { ImagesContainer, ImagesWrapper };
