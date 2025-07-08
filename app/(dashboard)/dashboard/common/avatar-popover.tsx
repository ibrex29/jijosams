"use client";

import { useMediaQuery } from "@mui/material"; 
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { getUserDetails } from "@/utils/getUserDetails";

export default function AvatarPopover() {
  const [userDetails, setUserDetails] = useState<{ email: string; role: string }>({
    email: "Email",
    role: "Role",
  });
  const [logo] = useState<string>("/images/avatar_bigger.png");
  const [companyName] = useState<string>("My Company");

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) setUserDetails(details);
    };

    fetchDetails();
  }, []);

  // Media query for detecting larger screens
  const isLargerScreen = useMediaQuery("(min-width:600px)"); // Customize the breakpoint as needed

  return (
    <Box display="flex" marginRight={"10px"} alignItems="center" gap={2} sx={{
        width: {
          xs: "auto", 
          sm: 180,    
          md: 210,   
          lg: 210,    
        },
      }}>
      {/* Icon Button with Avatar */}
      <IconButton
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(Boolean() && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={logo}
          alt={companyName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {companyName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {/* Display User Info */}
      {isLargerScreen && (
        <Box>
          {/* Tooltip for full email */}
          <Tooltip title={userDetails.email} arrow>
            <Typography
              variant="subtitle2"
              sx={{
                color: "black",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "180px", // Adjust max width to fit your layout
              }}
            >
              {userDetails.email.charAt(0).toUpperCase() + userDetails.email.slice(1).toLowerCase()}
            </Typography>
          </Tooltip>
          <Typography variant="caption" sx={{ color: "black" }}>
            {userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1).toLowerCase()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
