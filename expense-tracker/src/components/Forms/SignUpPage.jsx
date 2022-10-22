import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDataFromStore } from "../../store/state/StateProvider";
import { userAuthSignup } from "../../apicalls/user-apicalls";

export default function SignUp() {
  const [dispatch] = useDataFromStore();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [retypepassword, setRePwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSignUp, setSignUp] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, retypepassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        password !== retypepassword ||
        password.length < 6 ||
        retypepassword.length < 6
      ) {
        alert("passwords do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/register",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      setUser("");
      setPwd("");
      setRePwd("");
      navigate("/login", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
        console.log("Error wrong");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate(0, { replace: true });
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="retype-password"
          label="Password"
          type="retype-assword"
          id="retype-password"
          autoComplete="retype-password"
          onChange={(e) => setRePwd(e.target.value)}
          value={retypepassword}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>

        <Grid container>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={(e) => handleSignIn(e)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
