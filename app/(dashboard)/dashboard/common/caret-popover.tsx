"use client";

import { LogoutTwoTone } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";  
import { MouseEvent, useEffect, useState } from "react";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";
import StyledButton from "@/app/components/@dashboard/components/button";
import { baseUrl } from "@/constants/config";
import { getUserDetails } from "@/utils/getUserDetails";



const MENU_PERSONAL = [
  {
    label: "Settings",
    icon: "eva:settings-outline",
    link: "/dashboard/settings",
  },
];

export default function CaretPopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userDetails, setUserDetails] = useState<{ email: string; role: string }>({
    email: "Email",
    role: "Role",
  });
  const [logo] = useState<string>("/images/avatar_bigger.png");
  const [openDialog, setOpenDialog] = useState(false); // To control the dialog visibility
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) setUserDetails(details);
    };

    fetchDetails();
  }, []);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      // If you need to perform some custom API logout before signing out
      const session = await getSession();
      if (session?.token) {
        const response = await fetch(`${baseUrl}/v1/auth/logout`, {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${session.token}`,
          },
        });

        console.log("Custom logout API response:", response);

        if (!response.ok) {
          console.error("Custom logout API failed.");
        }
      }

      // Now, log out using next-auth
      await signOut({ redirect: false });  // Don't redirect automatically, we handle that manually

      // Optionally, redirect to the login page after logout
      router.push("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);  // Close the dialog after logout attempt
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(Boolean(anchorEl) && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`,
          }),
        }}
      >
        <Iconify icon="eva:arrow-ios-downward-fill" width={24} />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box
          sx={{
            my: 1.5,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={logo}
            alt={userDetails.email}
            sx={{
              fontSize: "10px",
              mb: 1,
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "150px",
            }}
          >
            {userDetails.email.charAt(0).toUpperCase() + userDetails.email.slice(1).toLowerCase()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "12px",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {userDetails.role.charAt(0).toUpperCase() + userDetails.role.slice(1).toLowerCase()}
          </Typography>
        </Box>

        <Box>
          {MENU_PERSONAL.map((option) => (
            <MenuItem
              key={option.label}
              onClick={handleClose}
              sx={{ fontSize: "14px", color: "text.primary" }}
            >
              <Link
                href={option.link}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Iconify icon={option.icon} width={22} sx={{ mr: 1 }} /> &nbsp;
                {option.label}
              </Link>
            </MenuItem>
          ))}
        </Box>

        <Box sx={{ p: 1, mt: 1 }}>
          <StyledButton
            size="small"
            endIcon={<LogoutTwoTone />}
            color="secondary"
            onClick={() => setOpenDialog(true)} // Open the logout confirmation dialog
          >
            Logout
          </StyledButton>
        </Box>
      </Popover>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="secondary"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
