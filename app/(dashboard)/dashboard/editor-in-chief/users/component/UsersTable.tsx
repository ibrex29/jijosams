"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { User, UserRole, Section } from "./GetUsers";

type Props = {
  users: User[];
  roles: UserRole[];
  sections: Section[];
  selectedRoles: { [userId: string]: string[] };
  selectedSections: { [userId: string]: string };
  setSelectedRoles: React.Dispatch<React.SetStateAction<{ [userId: string]: string[] }>>;
  setSelectedSections: React.Dispatch<React.SetStateAction<{ [userId: string]: string }>>;
  handleSave: (userId: string) => void;
};

const UsersTable = ({
  users,
  roles,
  sections,
  selectedRoles,
  selectedSections,
  setSelectedRoles,
  setSelectedSections,
  handleSave,
}: Props) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName || "-"}</TableCell>
                <TableCell>{user.lastName || "-"}</TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Select
                    multiple
                    value={selectedRoles[user.id] || []}
                    onChange={(e) => setSelectedRoles((prev) => ({ ...prev, [user.id]: e.target.value as string[] }))}
                    size="small"
                    renderValue={(selected) =>
                      roles.filter((r) => (selected as string[]).includes(r.id))
                           .map((r) => r.roleName).join(", ")
                    }
                  >
                    {roles.map((role) => <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>)}
                  </Select>
                </TableCell>

                <TableCell>
                  <Select
                    value={selectedSections[user.id] || ""}
                    onChange={(e) => setSelectedSections((prev) => ({ ...prev, [user.id]: e.target.value }))}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {sections.map((section) => <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>)}
                  </Select>
                </TableCell>

                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Tooltip title="Save">
                    <IconButton color="primary" onClick={() => handleSave(user.id)}>
                      <Save />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} align="center">No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersTable;
