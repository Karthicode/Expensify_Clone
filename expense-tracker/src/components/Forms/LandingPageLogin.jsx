import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef, useState, useEffect } from "react";
import GoogleLoginBtn from "../MUIComponents/GoogleButton";
import SignUp from "./SignUpPage";
import { actions } from "../../store/actions";
import { groupedUserData } from "../../apicalls/user-apicalls";
import { useDataFromStore } from "../../store/state/StateProvider";
import { ButtonGroup } from "@mui/material";
import { useDataFromStore } from "../../store/state/StateProvider";
import axios from "axios";
//const LOGIN_URL = '/login';

export default function SignInSide() {
  const [currentUser, setCurrentUser] = useState(null);

  const [{ data }, dispatch] = useDataFromStore();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSignUp, setSignUp] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      dispatch({
        type: actions.LOGIN,
        accessToken: accessToken,
      });
      setUser("");
      setPwd("");
      navigate("/home", { replace: true });
    } catch (err) {
      alert(JSON.stringify(err, null, 2));
      if (!err?.response) {
        setErrMsg("Login Failed. Please check credentials");

        console.log("Error wrong");
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setSignUp(true);
  };
  // useEffect(() => {
  //     localStorage.setItem("persist", persist);
  // }, [persist])
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password", { replace: true });
  };

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?finance,money)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          sx={{
            backgroundColor: "	rgb(120, 258, 255)",
          }}
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={8}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://www.deltavcapital.com/wp-content/uploads/2018/05/expensify-logo-2.png"
              height={40}
              width={170}
            />
            {isSignUp && <SignUp />}
            {!isSignUp && (
              <>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                  />
                  <TextField
                    helperText={errMsg}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                  />
                  <GoogleLoginBtn />
                  <ButtonGroup>
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Box component="span" sx={{ p: 5 }}></Box>
                    <Button
                      type="submit"
                      onClick={(e) => handleSignUp(e)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </ButtonGroup>

                  <Grid container>
                    <Grid item xs>
                      <Link
                        onClick={(e) => handleForgotPassword(e)}
                        variant="body2"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
