"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect,useState } from "react";
import { Controller,useForm } from "react-hook-form";

import { getSection } from "@/app/api/sections";
import { createUser } from "@/app/api/users";
import useNotification from "@/hooks/useNotification";
import { UserRole } from "@/types";

type FormValues = {
  title: string;
  email: string;
  password: string;
  roleName: string;
  sectionId?: string;
};

const RegisterUser = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [sections, setSections] = useState<{ id: string; name: string }[]>([]);
  const { notify } = useNotification();
  const selectedRole = watch("roleName");
  const titleOptions = ["Mr", "Mrs", "Prof", "Dr", "Miss"];

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSection();
        if (Array.isArray(data)) {
          setSections(data);
        } else {
          console.error("Expected an array but got:", data);
          setSections([]);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    try {
      const response = await createUser(data);
      if (response.statusCode) {
        console.error(response.message || "Failed to create the user.");
        notify("Failed to create User", { mode: "error" });
      } else {
        notify("User successfully created", { mode: "success" });
        reset(); // Clear the form after successful creation
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Failed to create User", { mode: "error" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ marginBottom: "21.5px" }}>
        <Typography variant="h6" marginBottom="10px">
          Register New User
        </Typography>

        {/* Role Selection */}
        <Controller
          name="roleName"
          control={control}
          rules={{ required: "Role is required" }}
          defaultValue={UserRole.ManagingEditor}
          render={({ field }) => (
            <Grid container spacing={2}>
              {[
                UserRole.ManagingEditor,
                UserRole.Reviewer,
                UserRole.SectionEditor,
              ].map((role) => (
                <Grid item xs={12} sm={4} key={role}>
                  <Box
                    onClick={() => field.onChange(role)}
                    sx={{
                      cursor: "pointer",
                      border: "2px solid",
                      paddingY: "10px",
                      paddingX: "15px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: field.value === role ? "#268500" : "#D2D2D2",
                    }}
                  >
                    <FormControlLabel
                      value={role}
                      control={<Radio checked={field.value === role} />}
                      label={role}
                      sx={{ pointerEvents: "none" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        />
        {errors.roleName && (
          <Typography color="error">{errors.roleName.message}</Typography>
        )}
      </Box>

      {/* Section Dropdown - Only show if role is Reviewer or Section Editor */}
      {(selectedRole === UserRole.Reviewer ||
        selectedRole === UserRole.SectionEditor) && (
        <Controller
          name="sectionId"
          control={control}
          rules={{ required: "Section is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Section"
              fullWidth
              margin="normal"
              error={!!errors.sectionId}
              helperText={errors.sectionId ? errors.sectionId.message : ""}
            >
              {sections.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}

      {/* Title Field */}
      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          >
            {titleOptions.map((title) => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}
      />

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
        defaultValue=""
        render={({ field }) => (
          <Box position="relative">
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 0, top: 22 }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        )}
      />

      <Box width="100%" display="flex" mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterUser;
