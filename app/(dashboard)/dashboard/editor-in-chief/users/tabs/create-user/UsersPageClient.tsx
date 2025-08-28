"use client";

import { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GetUsers from "../../component/GetUsers";
import RegisterUser from ".";

export default function UsersPageClient() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* Header with Action */}
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Tooltip title="Register a new user">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Register User
          </Button>
        </Tooltip>
      </Box>

      {/* Users Table */}
      <GetUsers />

      {/* Registration Modal */}
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>Create New User</DialogTitle>
        <DialogContent dividers>
          <RegisterUser />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
