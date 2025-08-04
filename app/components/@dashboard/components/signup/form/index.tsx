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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { createAuthor } from "@/app/api/users";
import StyledButton from "../../styled-button";

interface SignupData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  affiliation: string;
  expertiseArea: string;
}

const SignupForm: FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<SignupData>({
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      affiliation: "",
      expertiseArea: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    console.log(data);

    try {
      const response = await createAuthor(data);
      console.log(response);

      if (response.id && response.userId) {
        router.push("/signin"); // Redirect to login page after successful sign-up
      } else if (
        response.statusCode === 409 &&
        response.message.includes("Email address already exists")
      ) {
        setErrorMessage("The email address you entered is already registered.");
      } else if (
        response.statusCode === 400 &&
        response.message[0].includes("Password too weak")
      ) {
        setErrorMessage(
          "Password is too weak. It must contain at least one uppercase letter, one lowercase letter, and one number.",
        );
      } else {
        setErrorMessage(
          "Sign-up failed. Please check your details and try again.",
        );
      }
    } catch (error) {
      setErrorMessage("A network error occurred. Please try again.");
      console.error("Error during sign-up:", error);
    }

    setIsLoading(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container component="main" maxWidth="md">
        {errorMessage && (
          <Alert sx={{ mb: 5 }} variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 8,
            borderRadius: 3,
            px: 4,
            py: 4,
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
              lineHeight: "91%",
            }}
          >
            Sign Up
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
              marginY: 2,
            }}
          >
            Create your account to get started
          </Typography>
          <form onSubmit={handleSubmit(signup)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field, fieldState }) => (
                    <FormControl
                      fullWidth
                      variant="filled"
                      error={!!fieldState.error}
                    >
                      <InputLabel>Title</InputLabel>
                      <Select
                        {...field}
                        label="Title"
                        sx={{
                          textAlign: "left",
                          "& .MuiSelect-select": {
                            textAlign: "left",
                          },
                        }}
                      >
                        {" "}
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Dr">Dr</MenuItem>
                        <MenuItem value="Prof">Prof</MenuItem>
                      </Select>
                      {fieldState.error && (
                        <Typography variant="body2" color="error">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
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
                      fullWidth
                      label="Email Address"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <FilledInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
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
              <Grid item xs={12}>
                <Controller
                  name="affiliation"
                  control={control}
                  rules={{ required: "Affiliation is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Affiliation"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="expertiseArea"
                  control={control}
                  rules={{ required: "Expertise Area is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Expertise Area"
                      variant="filled"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  size="xlarge"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupForm;
