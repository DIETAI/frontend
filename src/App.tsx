import React from "react";

//routes
import { RouterProvider } from "react-router-dom";

//context
import { useDarkMode } from "context/darkMode.context";

//routes
import { router } from "routes/index.routes";

//styles
import GlobalStyle from "theme/globalStyle";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme } from "theme/theme";

//store
import { store } from "store/store";
import { Provider as StoreProvider } from "react-redux";
import { AlertProvider } from "layout/dashboard/context/alert.context";

const App = () => {
  const { darkMode } = useDarkMode();

  const theme = darkMode ? darkTheme : defaultTheme;

  return (
    <>
      <GlobalStyle />
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <RouterProvider router={router} />
          </AlertProvider>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
};

export default App;
