import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Skeleton, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import { getReviewer } from "@/app/api/sections";
import { ManuscriptProps, Reviewer } from "@/types";

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
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dueDates, setDueDates] = useState<{ [key: string]: Dayjs | null }>({});

  const fetchReviewers = async () => {
    setLoading(true);
    try {
      const data = await getReviewer();
      if (Array.isArray(data)) {
        setReviewers(data);
      } else {
        console.error("Expected an array but got:", data);
        setReviewers([]);
      }
    } catch (error) {
      console.error("Error fetching reviewers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchReviewers();
    }
  }, [open]);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: 4,
            maxWidth: 700,
            margin: "auto",
            mt: "20vh",
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">
              Assign Reviewer for{" "}
              <span className="bold">{manuscript.title}</span>
            </Typography>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          {loading ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={56} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              {reviewers.map((reviewer) => {
                const fullName =
                  `${reviewer.user.firstName} ${reviewer.user.lastName}`.trim();
                return (
                  <Box
                    key={reviewer.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAssign(reviewer.id)}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {fullName || "Unnamed Reviewer"}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <DatePicker
                        label="Due Date"
                        value={dueDates[reviewer.id] || dayjs()}
                        onChange={(date) => handleDateChange(reviewer.id, date)}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}
