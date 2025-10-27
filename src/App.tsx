import { HomePage } from "./components/pages/Home/HomePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegistrationPage } from "./components/pages/User/UserRegistrationPage.tsx";
import { CompanyRegistrationPage } from "./components/pages/Company/Registration/CompanyRegistrationPage.tsx";
import {
  COMPANIES_LIST,
  COMPANY_DASHBOARD,
  COMPANY_REGISTRATION,
  DRIVER_REGISTRATION,
  DRIVERS_VIEW,
  HOME,
  TRAILERS_VIEW,
  TRUCKS_BOARD,
  TRUCKS_VIEW,
  USER_REGISTRATION,
} from "./constants/route/internal-route-constants.ts";
import { CompaniesPage } from "./components/pages/Company/View/CompaniesPage.tsx";
import { CompanyDashboardPage } from "./components/pages/Company/Dashboard/CompanyDashboardPage.tsx";
import { TrucksBoardPage } from "./components/pages/Company/TrucksBoard/TrucksBoardPage.tsx";
import { DriverRegistrationPage } from "./components/pages/Driver/DriverRegistrationPage.tsx";
import { DriversPage } from "./components/pages/Driver/DriversPage.tsx";
import { TruckRegistrationForm } from "./components/pages/Truck/Registration/TruckRegistrationForm.tsx";
import { TrailerRegistrationPage } from "./components/pages/Trailer/Registration/TrailerRegistrationPage.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
          path={`${COMPANY_DASHBOARD}${TRUCKS_VIEW}`}
          element={<TruckRegistrationForm />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRAILERS_VIEW}`}
          element={<TrailerRegistrationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
