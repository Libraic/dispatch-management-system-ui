import { Home } from "./home/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./registration/RegistrationForm.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
};
