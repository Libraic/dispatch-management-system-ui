import { Home } from "./home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegistrationForm } from "./user/registration/UserRegistrationForm.tsx";
import { CompanyRegistrationForm } from "./company/registration/CompanyRegistrationForm.tsx";
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
} from "./utils/constants/internal-routes.ts";
import { CompaniesList } from "./company/CompaniesList.tsx";
import { CompanyDashboard } from "./company/dashboard/CompanyDashboard.tsx";
import { TrucksBoard } from "./company/dashboard/trucks-board/TrucksBoard.tsx";
import { DriverRegistrationForm } from "./driver/registration/DriverRegistrationForm.tsx";
import { DriversView } from "./driver/view/DriversView.tsx";
import { TruckCreationForm } from "./company/dashboard/assets/trucks/TruckCreationForm.tsx";
import { TrailerCreationForm } from "./company/dashboard/assets/trailers/TrailerCreationForm.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={USER_REGISTRATION} element={<UserRegistrationForm />} />
        <Route
          path={COMPANY_REGISTRATION}
          element={<CompanyRegistrationForm />}
        />
        <Route path={COMPANIES_LIST} element={<CompaniesList />} />
        <Route path={COMPANY_DASHBOARD} element={<CompanyDashboard />} />
        <Route
          path={`${COMPANY_DASHBOARD}${TRUCKS_BOARD}`}
          element={<TrucksBoard />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVERS_VIEW}`}
          element={<DriversView />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${DRIVER_REGISTRATION}`}
          element={<DriverRegistrationForm />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRUCKS_VIEW}`}
          element={<TruckCreationForm />}
        />
        <Route
          path={`${COMPANY_DASHBOARD}${TRAILERS_VIEW}`}
          element={<TrailerCreationForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};
