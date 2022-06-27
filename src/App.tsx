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

// //redux
// import { useDispatch } from "react-redux";
// import { getUser } from "@redux/user/user.actions";

//styles
import GlobalStyle from "theme/globalStyle";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme } from "theme/theme";

//auth
import { useSession } from "utils/firebase";

const App = () => {
  // useSession();
  const { darkMode } = useDarkMode();
  // const dispatch = useDispatch();

  const theme = darkMode ? darkTheme : defaultTheme;

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  //useSwr getUser

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
};

// export default function WrappedApp() {
//   return (
//     <Suspense fallback="...is loading">
//       <App />
//     </Suspense>
//   );
// }

export default App;
