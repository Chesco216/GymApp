import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Providers } from "./providers";
import { RequireAuth } from "./router";
import { LandingPage } from "./landing/components/LandingPage";
import { CalculatorPage } from "./landing/components/CalculatorPage";
import { MacrosPage } from "./landing/components/MacrosPage";
import { LoginPage } from "./auth/components/LoginPage";
import { SigninPage } from "./auth/components/SigninPage";
import { ProfilePage } from "./profile/components/ProfilePage";
import { ProfileUpdatePage } from "./profile/components/ProfileUpdatePage";
import { InfoForm } from "./profile/components/InfoForm";
import TermsConditions from "./common/components/TermsConditions";

const App = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/macros" element={<MacrosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:option"
          element={
            <RequireAuth>
              <ProfileUpdatePage />
            </RequireAuth>
          }
        />
        <Route
          path="/info-form"
          element={
            <RequireAuth>
              <InfoForm />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
