"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPaginatedUsers, updateUserRoleOrSection } from "@/app/api/users";
import useNotification from "@/hooks/useNotification";
import UsersFilters from "./UsersFilters";
import PaginationComponent from "./PaginationComponent";
import UsersTable from "./UsersTable";
import { getSection } from "@/app/api/sections";
import { getRoles } from "@/app/api/roles";

export type UserRole = { id: string; roleName: string; description: string };
export type Section = { id: string; name: string };
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  roles: UserRole[];
  sectionId?: string;
};

const GetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "email" | "firstName" | "lastName">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [selectedRoles, setSelectedRoles] = useState<{ [userId: string]: string[] }>({});
  const [selectedSections, setSelectedSections] = useState<{ [userId: string]: string }>({});

  const { notify } = useNotification();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedUsers({ page, limit, sortField, sortOrder, search, roleId, sectionId });
      if (response?.data) {
        setUsers(response.data);
        setTotalPages(response.meta?.pageCount ?? 1);

        const rolesState: { [key: string]: string[] } = {};
        const sectionsState: { [key: string]: string } = {};
        response.data.forEach((user: User) => {
          rolesState[user.id] = user.roles.map((r) => r.id);
          sectionsState[user.id] = user.sectionId || "";
        });
        setSelectedRoles(rolesState);
        setSelectedSections(sectionsState);
      } else {
        notify("Failed to fetch users", { mode: "error" });
      }
    } catch (error) {
      console.error(error);
      notify("Error fetching users", { mode: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchRolesAndSections = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(Array.isArray(rolesData) ? rolesData : []);

      const sectionsData = await getSection();
      setSections(Array.isArray(sectionsData) ? sectionsData : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRolesAndSections();
  }, [page, limit, sortField, sortOrder]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchUsers();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, roleId, sectionId]);

  const handleSave = async (userId: string) => {
    try {
      const newRoles = selectedRoles[userId] || [];
      const section = selectedSections[userId] || undefined;

      for (const roleId of newRoles) {
        const roleExists = users.find((u) => u.id === userId)?.roles.some((r) => r.id === roleId);
        await updateUserRoleOrSection(userId, { roleId, sectionId: section, replaceRoles: !roleExists });
      }

      notify("User updated successfully", { mode: "success" });
      fetchUsers();
    } catch (error) {
      console.error(error);
      notify("Failed to update user", { mode: "error" });
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Users</Typography>

      <UsersFilters
        search={search}
        setSearch={setSearch}
        roleId={roleId}
        setRoleId={setRoleId}
        sectionId={sectionId}
        setSectionId={setSectionId}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onApply={fetchUsers}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <UsersTable
          users={users}
          roles={roles}
          sections={sections}
          selectedRoles={selectedRoles}
          selectedSections={selectedSections}
          setSelectedRoles={setSelectedRoles}
          setSelectedSections={setSelectedSections}
          handleSave={handleSave}
        />
      )}

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(value) => setPage(value)}
        limit={limit}
        onLimitChange={(newLimit) => { setLimit(newLimit); setPage(1); }}
      />
    </Box>
  );
};

export default GetUsers;
