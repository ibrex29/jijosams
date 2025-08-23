import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function ManuscriptCardSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
          <Card
            sx={{
              width: "100%",
              borderRadius: "16px",
              position: "relative",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              p: 2,
            }}
          >
            <CardActionArea sx={{ p: 1 }}>
              {/* Top right status */}
              <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                <Skeleton variant="rounded" width={80} height={28} />
              </Box>

              <CardContent>
                {/* Avatar + Title */}
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  borderBottom="1px solid"
                  borderColor="grey.200"
                  pb={2}
                >
                  <Skeleton variant="circular" width={50} height={50} />

                  <Stack direction="column" flex={1}>
                    <Skeleton variant="text" width="60%" height={28} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Stack>
                </Box>

                {/* Footer actions */}
                <Stack
                  spacing={2}
                  direction="row"
                  mt={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography display="flex" alignItems="center" gap={0.5}>
                      <Skeleton height={18} width={60} />
                    </Typography>
                    <Typography display="flex" alignItems="center" gap={0.5}>
                      <Skeleton height={18} width={60} />
                    </Typography>
                  </Box>

                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={34}
                    sx={{ borderRadius: "20px" }}
                  />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
