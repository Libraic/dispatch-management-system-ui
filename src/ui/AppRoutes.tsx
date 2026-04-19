import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRegistrationPage } from "#/pages/Company/CompanyRegistrationPage";
import {
  COMPANIES_LIST,
  COMPANY_DASHBOARD,
  COMPANY_REGISTRATION,
  DISPATCHERS_VIEW,
  DRIVER_REGISTRATION,
  DRIVERS_VIEW,
  HOME,
  LANDING,
  PLANNER,
  TRAILER_REGISTRATION,
  TRAILERS_VIEW,
  TRUCK_REGISTRATION,
  TRUCKS_VIEW,
} from "#/constants/route/internal-route-constants";
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

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING} element={<LandingPage />} />
        <Route path={HOME} element={<HomePage />} />
        <Route
          path={COMPANY_REGISTRATION}
          element={<CompanyRegistrationPage />}
        />
        <Route path={COMPANIES_LIST} element={<CompaniesPage />} />
        <Route path={COMPANY_DASHBOARD} element={<CompanyDashboardPage />} />
        <Route
          path={`${COMPANY_DASHBOARD}${PLANNER}`}
          element={<PlannerPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVERS_VIEW}`}
          element={<DriversPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DISPATCHERS_VIEW}`}
          element={<DispatcherRegistrationPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVER_REGISTRATION}`}
          element={<DriverRegistrationPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRUCKS_VIEW}`}
          element={<TrucksPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRUCK_REGISTRATION}`}
          element={<TruckRegistrationPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRAILERS_VIEW}`}
          element={<TrailersPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRAILER_REGISTRATION}`}
          element={<TrailerRegistrationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
