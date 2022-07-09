import styled, { css } from "styled-components";

const AddDinnerFormWrapper = styled.form(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
    border: 0.1rem solid ${palette.common.border};
    border-radius: ${border.rounded.sm};
    transition: 0.3s ease-out;

    h2 {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
    }

    p {
      font-size: ${fontSize.m};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
    }
  `
);

const DinnerProductPortionsWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    width: 100%;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  `
);

interface ISelectedPortion {
  selectedPortion: boolean;
}

const DinnerProductPortion = styled.div<ISelectedPortion>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    selectedPortion,
  }) => css`
    padding: 1rem 2rem;
    border: 0.1rem dashed ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.m};
    font-weight: ${fontWeight.light};
    color: ${palette.common.text};
    cursor: pointer;
    transition: 0.3s ease-out;

    :hover {
      box-shadow: ${palette.common["box-shadow"]};
    }

    ${selectedPortion &&
    css`
      border: 0.1rem dashed ${palette.primary.main};
    `}
  `
);

export { AddDinnerFormWrapper };
