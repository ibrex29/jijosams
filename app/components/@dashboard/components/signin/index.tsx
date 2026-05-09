"use client";

import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

import SigninForm from "./form";

const SigninMain: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "background.default",
      }}
    >
      {/* ── Brand panel ── */}
      {!isMobile && (
        <Box
          sx={{
            width: { md: "45%", lg: "40%" },
            flexShrink: 0,
            background: `linear-gradient(155deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, #D78A25 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: { md: 5, lg: 7 },
            py: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              top: -80,
              right: -100,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              bottom: 60,
              left: -60,
              pointerEvents: "none",
            }}
          />

          {/* Logo + journal name */}
          <Stack spacing={2}>
            <Box>
              <Image
                src="/logo/jijosams_logo.png"
                alt="SLU JST Logo"
                width={160}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: "white", lineHeight: 1.25, mt: 1 }}
            >
              SLU Journal of Science &amp; Technology
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 320 }}
            >
              A peer-reviewed platform advancing scientific and technological
              knowledge across disciplines.
            </Typography>
          </Stack>

          {/* Testimonial / highlight card */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
              borderRadius: 3,
              p: 3,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontStyle: "italic",
                lineHeight: 1.65,
                mb: 1.5,
              }}
            >
              &ldquo;Advancing knowledge through rigorous peer review and open
              scholarly discourse.&rdquo;
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
            >
              SLU JST Editorial Board
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── Form panel ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          py: { xs: 4, md: 6 },
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          {/* Mobile logo */}
          {isMobile && (
            <Stack alignItems="center" mb={4} spacing={1}>
              <Image
                src="/logo/jijosams_logo.png"
                alt="SLU JST Logo"
                width={120}
                height={75}
              />
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                SLU Journal of Science &amp; Technology
              </Typography>
            </Stack>
          )}

          <SigninForm />
        </Box>
      </Box>
    </Box>
  );
};

export default SigninMain;
