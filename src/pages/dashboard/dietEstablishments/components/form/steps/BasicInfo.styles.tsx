import styled, { css } from "styled-components";

const CheckBoxContainer = styled.div(
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
    justify-content: flex-start;
    gap: 3rem;
  `
);

const CheckBoxWrapper = styled.div(
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
    justify-content: flex-start;
    gap: 0.5rem;
  `
);

const NoMeasurementWrapper = styled.div(
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
    justify-content: flex-start;
    flex-direction: column;
    background: ${palette.common.contrast};
    padding: 2rem;
    border: 0.1rem dashed ${palette.primary.light};
    gap: 2rem;

    img {
      width: 10rem;
      height: 10rem;
      object-fit: contain;
    }

    h3 {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }
  `
);

export { CheckBoxContainer, CheckBoxWrapper, NoMeasurementWrapper };
