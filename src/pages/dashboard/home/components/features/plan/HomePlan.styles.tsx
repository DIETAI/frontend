import styled, { css } from "styled-components";

const HomeMeasurementsWrapper = styled.ul(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  `
);

const HomeMeasurementItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    width: 100%;

    cursor: pointer;
    border-radius: ${border.rounded.md};
    transition: 0.3s ease-out;

    :hover {
      background: ${palette.common.contrast};
    }

    :not(:last-child) {
      border-bottom: 0.1rem solid ${palette.common.border};
    }
  `
);

const ItemContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1.5rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.md};

    h2 {
      color: ${palette.primary.main};
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
    }

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
    }
  `
);

const ItemFeaturesWrapper = styled.div(
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
    gap: 1.5rem;
    width: 100%;
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    padding: 1rem;
  `
);

const ItemFeature = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.5rem;

    span {
      color: ${palette.common.text};
      font-size: 0.9rem;
      font-weight: ${fontWeight.semibold};
    }

    p {
      color: ${palette.common.text};
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
    }
  `
);

const ItemLength = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
  }) => css`
    display: flex;
    width: 5rem;
    height: 5rem;
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
  `
);

export {
  HomeMeasurementsWrapper,
  HomeMeasurementItem,
  ItemContentWrapper,
  ItemFeaturesWrapper,
  ItemFeature,
  ItemLength,
};
