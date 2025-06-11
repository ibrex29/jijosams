"use client";

import { Box, Container } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

import SignupForm from "./form";

const SignUpMain: FC = () => {
  return (
    <Box
      id="signin"
      sx={{
        // backgroundImage: "url('/images/logo/login-bg.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey", // Fallback color while the image loads
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ p: 2, textAlign: { xs: "center", md: "left" } }}>
          <Link href="/">{/* Add logo or any other elements if needed */}</Link>
        </Box>
        <Box
          sx={{
            py: 4,
            px: 3,
            textAlign: "center",
          }}
        >
          <SignupForm />
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpMain;
