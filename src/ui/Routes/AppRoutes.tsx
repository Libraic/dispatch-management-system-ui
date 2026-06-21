import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRegistrationPage } from "#/features/companies/pages/CompanyRegistrationPage";
import {
  COMPANY_BASE_ROUTE,
  COMPANY_REGISTRATION,
  DASHBOARD,
  DISPATCHERS,
  DRIVER_REGISTRATION,
  DRIVERS,
  HOME,
  LANDING,
  LOADS,
  LOGIN,
  PLANNER,
  SETTINGS,
  TRAILER_REGISTRATION,
  TRAILERS,
  TRUCK_REGISTRATION,
  TRUCKS,
} from "#/shared/routes/routes";
import { DashboardPage } from "#/features/companies/pages/DashboardPage";
import { DriverRegistrationPage } from "#/features/drivers/pages/DriverRegistrationPage";
import { DriversPage } from "#/features/drivers/pages/DriversPage";
import { TrucksPage } from "#/features/trucks/pages/TrucksPage";
import { TrailersPage } from "#/features/trailers/pages/TrailersPage";
import { LandingPage } from "#/features/landing/pages/LandingPage";
import { HomePage } from "#/features/home/pages/HomePage";
import { PlannerPage } from "#/features/planner/pages/PlannerPage";
import { DispatcherRegistrationPage } from "#/features/dispatchers/pages/DispatcherRegistrationPage";
import { SettingsPage } from "#/features/companies/pages/SettingsPage";
import { AppLayout } from "#/templates/AppLayout";
import { LoginPage } from "#/features/authentication/pages/LoginPage";
import { LoadsPage } from "#/features/loads/pages/LoadsPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING} element={<LandingPage />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={HOME} element={<HomePage />} />
        <Route
          path={COMPANY_REGISTRATION}
          element={<CompanyRegistrationPage />}
        />

        <Route element={<AppLayout />}>
          <Route
            path={`${COMPANY_BASE_ROUTE}${DASHBOARD}`}
            element={<DashboardPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${PLANNER}`}
            element={<PlannerPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${LOADS}`}
            element={<LoadsPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DRIVERS}`}
            element={<DriversPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DISPATCHERS}`}
            element={<DispatcherRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DRIVER_REGISTRATION}`}
            element={<DriverRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRUCKS}`}
            element={<TrucksPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRUCK_REGISTRATION}`}
            element={<CompanyRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRAILERS}`}
            element={<TrailersPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRAILER_REGISTRATION}`}
            element={<CompanyRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${SETTINGS}`}
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
