import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegistrationPage } from "./components/Pages/User/UserRegistrationPage.tsx";
import { CompanyRegistrationPage } from "./components/Pages/Company/CompanyRegistrationPage.tsx";
import {
  COMPANIES_LIST,
  COMPANY_DASHBOARD,
  COMPANY_REGISTRATION,
  DRIVER_REGISTRATION,
  DRIVERS_VIEW,
  FINANCIAL_REPORTS,
  HOME,
  LANDING,
  LOAD_BY_LOAD_REPORTS,
  TRAILER_REGISTRATION,
  TRAILERS_VIEW,
  TRUCK_REGISTRATION,
  TRUCKS_BOARD,
  TRUCKS_VIEW,
  USER_REGISTRATION,
} from "./constants/route/internal-route-constants.ts";
import { CompaniesPage } from "./components/Pages/Company/CompaniesPage.tsx";
import { CompanyDashboardPage } from "./components/Pages/Company/CompanyDashboardPage.tsx";
import { TrucksBoardPage } from "./components/Pages/Company/TrucksBoardPage.tsx";
import { DriverRegistrationPage } from "./components/Pages/Driver/DriverRegistrationPage.tsx";
import { DriversPage } from "./components/Pages/Driver/DriversPage.tsx";
import { TrailerRegistrationPage } from "./components/Pages/Trailer/TrailerRegistrationPage.tsx";
import { TrucksPage } from "./components/Pages/Truck/TrucksPage.tsx";
import { TruckRegistrationPage } from "./components/Pages/Truck/TruckRegistrationPage.tsx";
import { TrailersPage } from "./components/Pages/Trailer/TrailersPage.tsx";
import { LandingPage } from "./components/Pages/Landing/LandingPage.tsx";
import { HomePage } from "./components/Pages/Home/HomePage.tsx";
import { FinancialReportsPage } from "./components/Pages/Company/Reports/FinancialReportsPage.tsx";
import { LoadByLoadReportsPage } from "./components/Pages/Company/Reports/LoadByLoadReportsPage.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING} element={<LandingPage />} />
        <Route path={HOME} element={<HomePage />} />
        <Route path={USER_REGISTRATION} element={<UserRegistrationPage />} />
        <Route
          path={COMPANY_REGISTRATION}
          element={<CompanyRegistrationPage />}
        />
        <Route path={COMPANIES_LIST} element={<CompaniesPage />} />
        <Route path={COMPANY_DASHBOARD} element={<CompanyDashboardPage />} />
        <Route
          path={`${COMPANY_DASHBOARD}${TRUCKS_BOARD}`}
          element={<TrucksBoardPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVERS_VIEW}`}
          element={<DriversPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVER_REGISTRATION}`}
          element={<DriverRegistrationPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${FINANCIAL_REPORTS}`}
          element={<FinancialReportsPage />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${LOAD_BY_LOAD_REPORTS}`}
          element={<LoadByLoadReportsPage />}
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
