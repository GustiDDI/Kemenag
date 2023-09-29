import React, { useState } from "react";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField, Typography, colors } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import { ReactComponent as GoogleLogo } from '../assets/goggle.svg'; // Sesuaikan path ke logo Google SVG Anda
import { images } from "../assets";

const LoginPage = () => {
  const navigate = useNavigate();
  const [onRequest, setOnRequest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);

  const onSignin = (e) => {
    e.preventDefault();
    setOnRequest(true);

    const interval = setInterval(() => {
      setLoginProgress(prev => prev + 100 / 40);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    setTimeout(() => {
      setIsLoggedIn(true);
    }, 2100);

    setTimeout(() => {
      navigate("/dashboard");
    }, 3300);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        "::-webkit-scrollbar": { display: "none" },
        backgroundColor: '#FFFFFF',  // Set light blue background color
        webkitFontSmoothing: 'antialiased',
        webkitTextSizeAdjust: '100%',
        color: 'rgba(0, 0, 0, 0.87)',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        boxSizing: 'inherit',
        position: 'relative',
      }}
    >
      {/* Login form */}
      <Animate type="fade" delay={0.3}>
        <Box sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: colors.common.white,
          borderRadius: 8,
          p: 5,
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
        }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
              <img src={images.kemenag} alt="logo" height={200} />
            <Typography variant="h6" color="textSecondary" sx={{ color: "black" }}>
              Login to access your dashboard
            </Typography>
          </Box>
          <Animate type="fade" delay={0.7}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
            }}>
              <form onSubmit={onSignin}>
                <Stack spacing={3}>
                  <TextField label="Email" fullWidth required />
                  <TextField label="Password" type="password" fullWidth required />
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    //color="primary"
                    color="success"
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<GoogleLogo width={24} height={24} />}
                    sx={{
                      mt: 2,
                      backgroundColor: "white",
                      color: "black",
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: "#f1f3f4",
                      },
                    }}
                  >
                    Sign In with Google
                  </Button>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                      <Link to="forgotpassword" style={{ color: colors.red[900], textDecoration: 'none', fontWeight: 'bold' }}>
                        Forgot password?
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Animate>
        </Box>
      </Animate>
      {/* Login form */}

      {/* Loading box */}
      {onRequest && (
        <Animate type="fade" delay={0.7}>
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}>
            <CircularProgress size={100} value={loginProgress} color="primary" />
          </Box>
        </Animate>
      )}
      {/* Loading box */}

      {/* Footer */}
        <Box sx={{
          mt: 5,
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          color: "black",
        }}>
          Don't have an account?{" "}
          <Link to="register" style={{ color: colors.red[900], textDecoration: 'none' }}>
            Register now
          </Link>
        </Box>
      {/* Footer */}
    </Box>
  );
};

export default LoginPage;
