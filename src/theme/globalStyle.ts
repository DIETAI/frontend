import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  box-shadow: 0 0 0px 1000px #ffffff inset !important;
}
html {
    font-size: 62.5%;
}   
body {
    font-size: 1.6rem;
    font-family: "Poppins", sans-serif;
    overflow-x: hidden;
    background: white;
}
button, textarea, input, a {
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
}
`;

export default GlobalStyle;
