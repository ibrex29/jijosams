"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getSection } from "@/app/api/sections";
import { getRoles } from "@/app/api/roles";

type Section = { id: string; name: string };
type Role = { id: string; roleName: string };

type UsersFiltersProps = {
  search: string;
  setSearch: (val: string) => void;
  roleId: string;
  setRoleId: (val: string) => void;
  sectionId: string;
  setSectionId: (val: string) => void;
  sortField: "createdAt" | "email" | "firstName" | "lastName";
  setSortField: (val: "createdAt" | "email" | "firstName" | "lastName") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (val: "asc" | "desc") => void;
  onApply: () => void;
};

const UsersFilters = ({
  search,
  setSearch,
  roleId,
  setRoleId,
  sectionId,
  setSectionId,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  onApply,
}: UsersFiltersProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectionsData, rolesData] = await Promise.all([getSection(), getRoles()]);
        if (Array.isArray(sectionsData)) setSections(sectionsData);
        if (Array.isArray(rolesData)) setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchData();
  }, []);

  const selectedRole = roles.find((role) => role.id === roleId);
  const shouldShowSection =
    selectedRole && ["reviewer", "Section-Editor"].includes(selectedRole.roleName);

  const handleReset = () => {
    setSearch("");
    setRoleId("");
    setSectionId("");
    setSortField("createdAt");
    setSortOrder("asc");
    onApply();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        bgcolor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Filter Users
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={onApply}>
            Apply
          </Button>
        </Box>
      </Box>

      <Divider />

      {/* Search */}
      <TextField
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Role Filter */}
      <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Role:
        </Typography>
        <Chip
          label="All"
          clickable
          color={roleId === "" ? "primary" : "default"}
          onClick={() => setRoleId("")}
        />
        {roles.map((role) => (
          <Chip
            key={role.id}
            label={role.roleName}
            clickable
            color={roleId === role.id ? "primary" : "default"}
            onClick={() => setRoleId(role.id)}
          />
        ))}
      </Box>

      {/* Section Filter */}
      {shouldShowSection && (
        <TextField
          select
          label="Section"
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          size="small"
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value="">All Sections</MenuItem>
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              {section.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      {/* Sorting */}
      <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
        <TextField
          select
          label="Sort By"
          value={sortField}
          onChange={(e) =>
            setSortField(e.target.value as "createdAt" | "email" | "firstName" | "lastName")
          }
          size="small"
        >
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="createdAt">Created At</MenuItem>
        </TextField>

        <TextField
          select
          label="Order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          size="small"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
};

export default UsersFilters;
