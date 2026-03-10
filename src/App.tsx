import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompanyRegistrationPage } from "./components/Pages/Company/CompanyRegistrationPage.tsx";
import {
  COMPANIES_LIST,
  COMPANY_DASHBOARD,
  COMPANY_REGISTRATION,
  DISPATCHERS_VIEW,
  DRIVER_REGISTRATION,
  DRIVERS_VIEW,
  HOME,
  LANDING,
  TRAILER_REGISTRATION,
  TRAILERS_VIEW,
  TRUCK_REGISTRATION,
  PLANNER,
  TRUCKS_VIEW,
} from "./constants/route/internal-route-constants.ts";
import { CompaniesPage } from "./components/Pages/Company/CompaniesPage.tsx";
import { CompanyDashboardPage } from "./components/Pages/Company/CompanyDashboardPage.tsx";
import { DriverRegistrationPage } from "./components/Pages/Driver/DriverRegistrationPage.tsx";
import { DriversPage } from "./components/Pages/Driver/DriversPage.tsx";
import { TrailerRegistrationPage } from "./components/Pages/Trailer/TrailerRegistrationPage.tsx";
import { TrucksPage } from "./components/Pages/Truck/TrucksPage.tsx";
import { TruckRegistrationPage } from "./components/Pages/Truck/TruckRegistrationPage.tsx";
import { TrailersPage } from "./components/Pages/Trailer/TrailersPage.tsx";
import { LandingPage } from "./components/Pages/Landing/LandingPage.tsx";
import { HomePage } from "./components/Pages/Home/HomePage.tsx";
import { PlannerPage } from "./components/Pages/Company/PlannerPage.tsx";
import { DispatcherRegistrationPage } from "./components/Dispatcher/Registration/DispatcherRegistrationPage.tsx";

export const App = () => {
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
