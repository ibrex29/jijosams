"use client";

import { Box, Container } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

import SigninForm from "./form";

const SigninMain: FC = () => {
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
        bgcolor: "grey",
      }}
    >
      <Container maxWidth="sm">
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
          <SigninForm />
        </Box>
      </Container>
    </Box>
  );
};

export default SigninMain;
