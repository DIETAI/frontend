import React, { useEffect, Suspense } from "react";

//routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//context
import { useDarkMode } from "context/darkMode.context";

//routes
import AuthRoutes from "routes/authRoutes/auth.routes";
import DashboardRoutes from "routes/dashboardRoutes/index.routes";
import VerifyRoutes from "routes/verifyRoutes/verify.routes";
import HomeRoutes from "routes/homeRoutes/home.routes";
import SubscriptionPlanRoutes from "routes/subscriptionPlanRoutes/subscriptionPlan.routes";

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
            <Router>
              <Routes>
                <Route path="/*" element={<HomeRoutes />} />
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/verify/*" element={<VerifyRoutes />} />
                <Route
                  path="/subscription-plans/*"
                  element={<SubscriptionPlanRoutes />}
                />
                <Route path="/dashboard/*" element={<DashboardRoutes />} />
              </Routes>
            </Router>
          </AlertProvider>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
};

export default App;
