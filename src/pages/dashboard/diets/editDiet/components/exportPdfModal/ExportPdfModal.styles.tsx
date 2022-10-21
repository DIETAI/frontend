import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const ExportPdfModalContainer = styled.div(
  ({
    theme: {
      palette,
      typography: { fontSize, fontWeight },
      layout: { border },
    },
  }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100rem;
    position: relative;
  `
);

export { ExportPdfModalContainer };
