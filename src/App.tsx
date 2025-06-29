import { Home } from "./home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationForm } from "./registration/RegistrationForm.tsx";
import { CompanyRegistrationForm } from "./company/CompanyRegistrationForm.tsx";
import {
  COMPANIES_LIST,
  COMPANY_DASHBOARD,
  COMPANY_REGISTRATION,
  HOME,
  USER_REGISTRATION,
} from "./utils/routes/routes.ts";
import { CompaniesList } from "./company/CompaniesList.tsx";
import { CompanyDashboard } from "./company/CompanyDashboard.tsx";
import { TrucksBoard } from "./company/TrucksBoard.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={USER_REGISTRATION} element={<RegistrationForm />} />
        <Route
          path={COMPANY_REGISTRATION}
          element={<CompanyRegistrationForm />}
        />
        <Route path={COMPANIES_LIST} element={<CompaniesList />} />
        <Route path={COMPANY_DASHBOARD} element={<CompanyDashboard />} />
        <Route
          path={`${COMPANY_DASHBOARD}/trucks-board`}
          element={<TrucksBoard />}
        />
      </Routes>
    </BrowserRouter>
  );
};
