import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions";

export const GoogleLoginBtn = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [{ isAuthenticated }, dispatch] = useDataFromStore();

  const handleLoginSuccess = async (response) => {
    const data = response?.tokenId;
    dispatch({
      data: { data, isAuthenticated: loggedIn },
      type: actions.LOGIN,
    });
    console.log();
    setLoggedIn(true);
    navigate("/home", { replace: true });
  };
  const handleLoginFailure = (response) => {
    console.log(response);
  };
  const onSignoutSuccess = (e) => {
    alert("You have been logged out successfully");
    dispatch({
      type: actions.LOGOUT,
    });
    setLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <div>
      {loggedIn ? (
        <GoogleLogout
          clientId="770429347480-4qllhg19j5jp83ga5dg1vbtthrm9634n.apps.googleusercontent.com"
          buttonText="Sign Out"
          onLogoutSuccess={(e) => onSignoutSuccess(e)}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId="770429347480-4qllhg19j5jp83ga5dg1vbtthrm9634n.apps.googleusercontent.com"
          buttonText="Log in with Google"
          theme="dark"
          className="google-signin-button"
          onSuccess={(e) => handleLoginSuccess(e)}
          onFailure={(e) => handleLoginFailure(e)}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
    </div>
  );
};

export default GoogleLoginBtn;
