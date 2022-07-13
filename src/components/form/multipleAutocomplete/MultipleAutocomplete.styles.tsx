import styled, { css } from "styled-components";
import { IAutocompleteProps } from "./MultipleAutocomplete.interfaces";

const AutocompleteWrapper = styled.div<Pick<IAutocompleteProps, "fullWidth">>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
    fullWidth,
  }) => css`
    display: flex;
    flex-direction: column;
    width: 40rem;
    position: relative;

    ${fullWidth &&
    css`
      width: 100%;
    `}
  `
);

const AutoCompleteInputWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-out;
    width: 100%;

    label {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.medium};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }

    p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.error};
      margin-top: 0.5rem;
      letter-spacing: 0.05rem;
    }
  `
);

const MultipleAutoCompleteContentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 0.7rem;
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    color: ${palette.common.text};
    border: 0.1rem solid ${palette.common.slate};
    letter-spacing: 0.05rem;
    background: transparent;
    transition: 0.1s ease-out;

    input {
      padding: 0.7rem;
      /* border-radius: ${border.rounded.sm}; */
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      /* border: 0.1rem solid ${palette.common.slate}; */
      letter-spacing: 0.05rem;
      background: transparent;
      /* transition: 0.1s ease-out; */
      border: none;
      height: 100%;

      ::placeholder {
        font-size: 1.4rem;
        color: ${palette.common.slate};
      }

      :focus {
        outline: none;
      }
    }

    :focus {
      outline: none;
      border: 0.1rem solid ${palette.primary.main};
    }

    /* p {
      font-size: ${fontSize.xs};
      font-weight: ${fontWeight.light};
      color: ${palette.common.error};
      margin-top: 0.5rem;
      letter-spacing: 0.05rem;
    } */
  `
);

const SelectedItem = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    padding: 0.7rem 1.5rem;
    border-radius: ${border.rounded.sm};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
    border: 0.1rem solid ${palette.primary.light};
    letter-spacing: 0.05rem;
    background: ${palette.common.contrast};
    transition: 0.1s ease-out;

    span {
      font-size: 1.4rem;
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      letter-spacing: 0.05rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      /* width: 1.8rem;
      height: 1.8rem; */
      border-radius: 50%;
      border: none;
      /* background: ${palette.primary.light}; */
      background: transparent;
      transition: 0.3s ease-out;

      :hover {
        opacity: 0.7;
      }
      cursor: pointer;
      svg {
        width: 100%;
        height: 100%;
        /* width: 1.6rem;
        height: 1.6rem; */
        path {
          fill: ${palette.primary.main};
        }
      }
    }
  `
);

export {
  AutocompleteWrapper,
  AutoCompleteInputWrapper,
  MultipleAutoCompleteContentWrapper,
  SelectedItem,
};
