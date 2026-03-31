"use client";

import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

import SignupForm from "./form";

const SignUpMain: FC = () => {
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
            width: { md: "38%", lg: "34%" },
            flexShrink: 0,
            background: `linear-gradient(155deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, #D78A25 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: { md: 5, lg: 6 },
            py: 6,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              top: -70,
              right: -90,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              bottom: 80,
              left: -50,
              pointerEvents: "none",
            }}
          />

          {/* Logo + journal name */}
          <Stack spacing={2}>
            <Box>
              <Image
                src="/logo/slu_jst_logo.svg"
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
              sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 300 }}
            >
              Join a growing community of researchers and scholars shaping the
              future of science and technology.
            </Typography>
          </Stack>

          {/* Feature highlights */}
          <Stack spacing={2}>
            {[
              { icon: "✦", text: "Fast, transparent peer review" },
              { icon: "✦", text: "Open-access publication options" },
              { icon: "✦", text: "Track your manuscript in real time" },
            ].map((item) => (
              <Stack key={item.text} direction="row" spacing={1.5} alignItems="flex-start">
                <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.1, fontSize: "0.65rem" }}>
                  {item.icon}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                  {item.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* ── Form panel ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 5, lg: 7 },
          py: { xs: 4, md: 5 },
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 540, py: 2 }}>
          {/* Mobile logo */}
          {isMobile && (
            <Stack alignItems="center" mb={4} spacing={1}>
              <Image
                src="/logo/slu_jst_logo.svg"
                alt="SLU JST Logo"
                width={120}
                height={75}
              />
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                SLU Journal of Science &amp; Technology
              </Typography>
            </Stack>
          )}

          <SignupForm />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpMain;
