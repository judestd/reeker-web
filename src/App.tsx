import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import { store, persistor, RootState } from "./store";
import DashboardLayout from "./components/Layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { initI18n } from "./i18n/config/i18nConfig";
import { useSelector } from "react-redux";

// Lazy loaded components
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Teams = React.lazy(() => import("./pages/Teams"));
const Members = React.lazy(() => import("./pages/Members"));
const Users = React.lazy(() => import("./pages/Users"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Departments = React.lazy(() => import("./pages/Department"));
const RealEstateSource = React.lazy(() => import("./pages/RealEstateSource"));

// PublicRoute component
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="teams" element={<Teams />} />
                  <Route path="members" element={<Members />} />
                  <Route path="users" element={<Users />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="departments" element={<Departments />} />
                  <Route
                    path="realEstateSource"
                    element={<RealEstateSource />}
                  />
                </Route>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
