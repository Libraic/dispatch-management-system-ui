import { Home } from "./home/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegistrationForm } from "./registration/RegistrationForm.tsx";
import { CompanyRegistrationForm } from "./company/CompanyRegistrationForm.tsx";
import {
  COMPANY_REGISTRATION,
  HOME,
  USER_REGISTRATION,
} from "./utils/routes/routes.ts";

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
      </Routes>
    </BrowserRouter>
  );
};
