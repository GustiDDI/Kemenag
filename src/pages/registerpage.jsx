import React, { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, colors, CircularProgress, circularProgressClasses } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../assets";
import Animate from "../components/common/Animate";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [onRequest, setOnRequest] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

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
      navigate("/");
    }, 3300);
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* Background box */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "60%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${images.loginBg})`
        }}
      />
      {/* Background box */}

      {/* Registration form */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          height: "100%",
          width: isRegistered
            ? "100%"
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: colors.common.white
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: isRegistered ? 0 : 1,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            "::-webkit-scrollbar": { display: "none" }
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={140} />
              <Typography variant="h6" color="textSecondary" sx={{ color: "black" }}>
                Register to create an account
              </Typography>
            </Animate>
          </Box>
          {/* Logo */}

          {/* Form */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "::-webkit-scrollbar": { display: "none" }
            }}
          >
            <Animate delay={2.5}>
              <Box component="form" maxWidth={400} width="100%" onSubmit={onRegister}>
                <Stack spacing={3}>
                  <TextField label="Full Name" fullWidth required />
                  <TextField label="Email" fullWidth required />
                  <TextField label="Password" type="password" fullWidth required />
                  <Button type="submit" size="large" variant="contained" color="primary">
                    sign up
                  </Button>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions" />
                  </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* Form */}
          {/* Footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Animate delay={2.5}>
              <Typography
                display="inline"
                fontWeight="bold"
                sx={{ "& > a": { color: colors.red[900], ml: "5px" } }}
              >
                Have an account? -
                <Link to="/">
                  Login now
                </Link>
              </Typography>
            </Animate>
          </Box>
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: colors.common.white,
                zIndex: 1000
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: colors.grey[200] }}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant="determinate"
                  disableShrink
                  value={registerProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round"
                    },
                    position: "absolute",
                    left: 0,
                    color: colors.blue[600]
                  }}
                />
              </Box>
            </Stack>
          )}
          {/* loading box */}
        </Box>
      </Box>
      {/* Login form */}
    </Box>
  );
};

export default RegisterPage;
