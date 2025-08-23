/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Container,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import React, { FC, MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { rolesMap } from "@/types";
import StyledButton from "../../button";

// import StyledButton from "@/app/components/button";
// import { rolesMap } from "@/app/types";

const SigninForm: FC = () => {
  const router = useRouter();

  const [isError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = async (data: any) => {
    setIsLoading(true);
    const res = await signIn("credentials", { redirect: false, ...data });

    if (res && res.ok) {
      const user: Session | null | undefined = await getSession();

      if (user && user.user?.role !== undefined) {
        const route = rolesMap[user.user.role] || "/";
        router.push(route.toLowerCase());
      } else {
        console.error("User session or user role is undefined after sign in");
        setShowError(true);
      }
    } else {
      console.error("Error during sign in:", res);
      setShowError(true);
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        {isError && (
          <Alert sx={{ mb: 5 }} variant="filled" severity="error">
            Invalid login credentials!
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 14,
            borderRadius: 3,
            px: 4,
            py: 4,
            transition: "box-shadow",
            boxShadow: 4,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              fontSize: "26px",
              lineHeight: "131%",
              my: 1,
            }}
          >
            Login
          </Typography>
          <Typography
            component="p"
            variant="subtitle1"
            sx={{
              color: "text.disabled",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "131%",
              textAlign: "center",
            }}
          >
            Please enter your credentials to access your account
          </Typography>
          <form onSubmit={handleSubmit(login)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="filled" fullWidth required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <FilledInput
                        {...field}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid container justifyContent="end">
                <Grid item>
                  <Link href="/forgot-password" style={{ color: "#007a27" }}>
                    <Typography
                      component="p"
                      variant="subtitle1"
                      sx={{ mt: 1, color: "#007A28" }}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  size="xlarge"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SigninForm;
