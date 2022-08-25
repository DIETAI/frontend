import styled, { css } from "styled-components";

interface IGrow {
  grow?: boolean;
}

const FormWrapper = styled.div<IGrow>(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
      media: { breakpoints, up },
    },
    grow,
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: 0.3s ease-out;
    background: ${palette.common.main};
    border: 0.1rem solid ${palette.primary.light};
    gap: 4rem;
    padding: 4rem 2rem;
    border-radius: ${border.rounded.md};

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2rem;

      button {
        margin-top: 2rem;
      }
    }

    ${up(breakpoints.xs)} {
      padding: 6rem;
    }

    ${up(breakpoints.xl)} {
      width: 70rem;
      ${grow &&
      css`
        flex-grow: 1;
      `}
    }
  `
);

const FormHeading = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin-bottom: 2rem;

    h1 {
      font-size: ${fontSize.l};
      font-weight: ${fontWeight.semibold};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
      font-style: normal;
    }

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.light};
      color: ${palette.common.text};
      margin-bottom: 0.5rem;
      letter-spacing: 0.05rem;
    }
  `
);

const FormBackgroundImageWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    width: 100%;
    height: 20rem;
    background: ${palette.common.contrast};
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.md};
    position: relative;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .personData-backgroundImage {
      width: 70%;
      height: 100%;
      object-fit: cover;
      opacity: 0.2;
    }

    .personData-avatarImage {
      width: 16rem;
      height: 18rem;
      position: absolute;
      bottom: -2rem;
      left: 50%;
      transform: translateX(-50%);
      object-fit: cover;
      border-radius: ${border.rounded.md};
      border: 0.1rem solid ${palette.primary.light};
    }
  `
);

const EstablishmentWrapper = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    /* align-items: flex-start;
    justify-content: flex-start; */
    width: 100%;
    gap: 1rem;
  `
);
const EstablishmentItem = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 0.1rem solid ${palette.primary.light};
    border-radius: ${border.rounded.sm};
    width: 50rem;
    gap: 1rem;
    background: ${palette.common.contrast};

    p {
      font-size: ${fontSize.s};
      font-weight: ${fontWeight.medium};
      color: ${palette.primary.main};
    }
  `
);

export {
  FormWrapper,
  FormHeading,
  FormBackgroundImageWrapper,
  EstablishmentWrapper,
  EstablishmentItem,
};
