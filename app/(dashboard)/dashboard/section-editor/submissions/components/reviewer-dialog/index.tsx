"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  Skeleton,
  Typography,
  Tooltip,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUsers, PaginatedUsersResponse } from "@/app/api/users";
import { getRoles, Role } from "@/app/api/role";
import { ManuscriptProps } from "@/types";

interface ReviewerModalProps {
  manuscript: ManuscriptProps;
  open: boolean;
  onClose: () => void;
  onAssign: (
    reviewerId: string,
    manuscriptId: string,
    reviewDueDate: string,
  ) => void;
}

export default function ReviewerModal({
  manuscript,
  open,
  onClose,
  onAssign,
}: ReviewerModalProps) {
  const [dueDates, setDueDates] = useState<{ [key: string]: Dayjs | null }>({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch roles to get reviewer role ID
  const {
    data: roles,
    isLoading: rolesLoading,
    isError: rolesError,
  } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    enabled: open,
  });

  const reviewerRoleId = roles?.find(
    (role) => role.roleName.toLowerCase() === "reviewer",
  )?.id;

  // Fetch reviewers
  const {
    data: reviewers,
    isLoading,
    isError,
    refetch,
  } = useQuery<PaginatedUsersResponse>({
    queryKey: ["reviewers", page, search],
    queryFn: () =>
      getUsers({
        roleId: reviewerRoleId,
        // sectionId: "dbee4cc2-7b13-4993-a8b2-07a686368aae",
        search,
      }),
    enabled: open && !!reviewerRoleId,
  });

  const handleAssign = (reviewerId: string) => {
    const reviewDueDate = dueDates[reviewerId];
    if (reviewDueDate) {
      onAssign(reviewerId, manuscript.id, reviewDueDate.toISOString());
      onClose();
    }
  };

  const handleDateChange = (reviewerId: string, newDate: Dayjs | null) => {
    setDueDates((prev) => ({
      ...prev,
      [reviewerId]: newDate,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: 4,
            maxWidth: 800,
            margin: "auto",
            mt: "10vh",
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: 6,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography fontWeight={600}>
              Assign Reviewer for:{" "}
              <Typography component="span" fontWeight="bold" color="primary">
                {manuscript.title}
              </Typography>
            </Typography>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Search Input */}
          <TextField
            label="Search by Name or Email"
            placeholder="Type reviewer name or email..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2 }}
            size="small"
          />

          {/* Content */}
          {isLoading || rolesLoading ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={80} />
              ))}
            </Box>
          ) : isError || rolesError ? (
            <Typography color="error" textAlign="center">
              Failed to load reviewers or roles.{" "}
              <Typography
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => refetch()}
              >
                Retry
              </Typography>
            </Typography>
          ) : !reviewerRoleId ? (
            <Typography color="error" textAlign="center">
              Reviewer role not found.
            </Typography>
          ) : reviewers && reviewers.meta.itemCount > 0 ? (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {reviewers.data.map((reviewer) => {
                  if (!reviewer?.Reviewer) return null;
                  return (
                    <Card
                      key={reviewer?.Reviewer?.id}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid #eee",
                        boxShadow: 1,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          p: 0,
                          "&:last-child": { pb: 0 },
                        }}
                      >
                        <Tooltip title="Reviewer">
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            noWrap
                          >
                            {[reviewer.firstName, reviewer.lastName].filter(Boolean).join(" ") || "N/A"}
                          </Typography>
                        </Tooltip>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {reviewer.email}
                        </Typography>
                        <DatePicker
                          label="Due Date"
                          value={
                            dueDates[reviewer.Reviewer.id] ||
                            dayjs().add(7, "day")
                          }
                          onChange={(date) =>
                            handleDateChange(reviewer.Reviewer!.id, date)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: false,
                              sx: {
                                "& .MuiInputBase-input": {
                                  fontSize: "0.8rem",
                                  padding: "6px 8px",
                                },
                                "& .MuiInputLabel-root": {
                                  fontSize: "0.75rem",
                                },
                              },
                            },
                          }}
                          sx={{ width: 200 }}
                        />
                      </CardContent>
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: 10,
                          ml: 2,
                          mt: 4,
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => handleAssign(reviewer.Reviewer!.id)}
                      >
                        Assign
                      </Button>
                    </Card>
                  );
                })}
              </Box>
              {/* Pagination */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={reviewers.meta.pageCount}
                  page={reviewers.meta.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No reviewers found.
            </Typography>
          )}
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}
