import React from "react";
import { Dashboard, Home } from "./components/Home/Home";
import SignInSide from "./components/Forms/LandingPageLogin";
import "./styles/dist/App.css";
import { useDataFromStore } from "./store/state/StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Forms/SignUpPage";
import ForgotPassword from "./components/Forms/ForgotPassword";
import ResetPasswordPage from "./components/Forms/ResetPassword";

const App = () => {
  const [state, dispatch] = useDataFromStore();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/login"} element={<SignInSide />} />
          <Route path={"/"} element={<SignInSide />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={`/resetPassword`} element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
