import styled, { css } from "styled-components";

import { IAutocompleteProps } from "../Autocomplete.interfaces";

const AutocompletePopupWrapper = styled.div<
  Pick<IAutocompleteProps, "fullWidth">
>(
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
    background: ${palette.common.main};
    box-shadow: ${palette.common["box-shadow"]};
    padding: 2rem;
    border-radius: ${border.rounded.md};
    position: absolute;
    top: 100%;
    left: 0;
    max-height: 20rem;
    overflow-y: auto;

    ${fullWidth &&
    css`
      width: 100%;
    `}
  `
);

const AutocompletePopupItem = styled.li(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.2s ease-out;

    :not(:last-child) {
      border-bottom: 0.1rem solid ${palette.common.border};
    }

    :hover {
      background: ${palette.common.contrast};
    }

    color: ${palette.common.text};
    font-size: ${fontSize.s};
    font-weight: ${fontWeight.light};
  `
);

export { AutocompletePopupWrapper, AutocompletePopupItem };
