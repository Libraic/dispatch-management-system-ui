import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRegistrationPage } from "#/pages/Company/CompanyRegistrationPage";
import {
  COMPANIES_LIST,
  COMPANY_BASE_ROUTE,
  COMPANY_REGISTRATION,
  DASHBOARD,
  DISPATCHERS_VIEW,
  DRIVER_REGISTRATION,
  DRIVERS_VIEW,
  HOME,
  LANDING,
  LOGIN,
  PLANNER,
  SETTINGS,
  TRAILER_REGISTRATION,
  TRAILERS_VIEW,
  TRUCK_REGISTRATION,
  TRUCKS_VIEW,
} from "#/shared/routes/routes";
import { CompaniesPage } from "#/pages/Company/CompaniesPage";
import { CompanyDashboardPage } from "#/pages/Company/CompanyDashboardPage";
import { DriverRegistrationPage } from "#/pages/Driver/DriverRegistrationPage";
import { DriversPage } from "#/pages/Driver/DriversPage";
import { TrailerRegistrationPage } from "#/pages/Trailer/TrailerRegistrationPage";
import { TrucksPage } from "#/pages/Truck/TrucksPage";
import { TruckRegistrationPage } from "#/pages/Truck/TruckRegistrationPage";
import { TrailersPage } from "#/pages/Trailer/TrailersPage";
import { LandingPage } from "#/pages/Landing/LandingPage";
import { HomePage } from "#/pages/Home/HomePage";
import { PlannerPage } from "#/features/planner/pages/PlannerPage";
import { DispatcherRegistrationPage } from "#/features/dispatchers/pages/DispatcherRegistrationPage";
import { SettingsPage } from "#/features/companies/pages/SettingsPage";
import { AppLayout } from "#/templates/AppLayout";
import { LoginPage } from "#/features/authentication/pages/LoginPage";

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
        <Route path={COMPANIES_LIST} element={<CompaniesPage />} />

        <Route element={<AppLayout />}>
          <Route
            path={`${COMPANY_BASE_ROUTE}${DASHBOARD}`}
            element={<CompanyDashboardPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${PLANNER}`}
            element={<PlannerPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DRIVERS_VIEW}`}
            element={<DriversPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DISPATCHERS_VIEW}`}
            element={<DispatcherRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${DRIVER_REGISTRATION}`}
            element={<DriverRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRUCKS_VIEW}`}
            element={<TrucksPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRUCK_REGISTRATION}`}
            element={<TruckRegistrationPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRAILERS_VIEW}`}
            element={<TrailersPage />}
          />
          <Route
            path={`${COMPANY_BASE_ROUTE}${TRAILER_REGISTRATION}`}
            element={<TrailerRegistrationPage />}
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
