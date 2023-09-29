import React, { useState } from "react";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField, Typography, colors } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import { ReactComponent as GoogleLogo } from '../assets/goggle.svg'; // Sesuaikan path ke logo Google SVG Anda
import { images } from "../assets";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [onRequest, setOnRequest] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(0);

  const onRegister = (e) => {
    e.preventDefault();
    setOnRequest(true);

    const interval = setInterval(() => {
      setRegisterProgress(prev => prev + 100 / 40);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    setTimeout(() => {
      setIsRegistered(true);
    }, 2100);

    setTimeout(() => {
      navigate("/login");
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
      {/* Register form */}
      <Animate type="fade" delay={0.3}>
        <Box sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: colors.common.white,
          borderRadius: 8,
          p: 5,
          opacity: isRegistered ? 0 : 1,
          transition: "all 0.3s ease-in-out",
        }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <img src={images.kemenag} alt="logo" height={200} />
            <Typography variant="h6" color="textSecondary" sx={{ color: "black" }}>
              Register to create your account
            </Typography>
          </Box>
          <Animate type="fade" delay={0.7}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
            }}>
              <form onSubmit={onRegister}>
                <Stack spacing={3}>
                  <TextField label="Full Name" fullWidth required />
                  <TextField label="Email" fullWidth required />
                  <TextField label="Password" type="password" fullWidth required />
                  {/* Menggunakan komponen Checkbox, FormControlLabel, dan FormGroup */}
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions" />
                  </FormGroup>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    //color="primary"
                    color="success"
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Register
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
                    Register with Google
                  </Button>
                </Stack>
              </form>
            </Box>
          </Animate>
        </Box>
      </Animate>
      {/* Register form */}

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
            <CircularProgress size={100} value={registerProgress} color="primary" />
          </Box>
        </Animate>
      )}
      {/* Loading box */}

      {/* Footer */}
        <Box sx={{
          mt: 1,
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          color: "black",
        }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: colors.red[900], textDecoration: 'none' }}>
            Login now
          </Link>
        </Box>
      {/* Footer */}
    </Box>
  );
};

export default RegisterPage;
