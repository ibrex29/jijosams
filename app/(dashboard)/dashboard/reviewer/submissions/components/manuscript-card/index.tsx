import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  acceptManuscript,
  createReview,
  getRecommendation,
} from "@/app/api/reviewer";
import useNotification from "@/hooks/useNotification";
import { ManuscriptProps } from "@/types";
import { formatDate, getInitials, truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";

import Chat from "../chats";

interface Props {
  manuscript: ManuscriptProps;
  onClick: () => void;
  selected: boolean;
}

export default function ReviewerManuscriptCard({
  manuscript,
  onClick,
  selected,
}: Props) {
  const {
    title,
    keywords,
    authorName,
    coAuthor,
    status,
    createdAt,
    Document,
    reviewDueDate,
  } = manuscript;

  const manuscriptLink =
    Document && Document[0]?.manuscriptLink ? Document[0].manuscriptLink : "";
  const otherDocsLink =
    Document && Document[0]?.otherDocsLink ? Document[0].otherDocsLink : "";

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [recommendation, setRecommendation] = useState<string[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<string>("");
  const [hasReview, setHasReview] = useState<boolean>(false);
  const { notify } = useNotification();

  const fetchSections = async () => {
    try {
      const data = await getRecommendation();
      if (Array.isArray(data)) {
        setRecommendation(data);
      } else {
        console.error("Expected an array but got:", data);
        setRecommendation([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleReviewClick = async () => {
    setHasReview(true);

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const payload = {
      manuscriptId: manuscript.id,
      comments,
      recommendation: selectedRecommendation,
    };
    try {
      await createReview(payload);
      notify("Review submitted successfully");
      setOpen(false); // Close dialog on success
    } catch (error) {
      notify("Failed to submit review");
      console.error("Failed to submit review", error);
    }
  };

  const handleAcceptManuscript = async () => {
    const payload = {
      manuscriptId: manuscript.id,
      status: "ACCEPTED",
    };
    try {
      await acceptManuscript(payload);
      notify("Manuscript accepted successfully");
      setOpen(false);
    } catch (error) {
      notify("Failed to accept manuscript");
      console.error("Error accepting manuscript:", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: "100%", md: 700 },
          height: { xs: "fit", md: 370 },
          borderRadius: "16px",
          position: "relative",
          boxShadow: selected
            ? "0 6px 20px rgba(0, 0, 0, 0.15)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid",
          borderColor: selected ? "primary.main" : "grey.200",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            borderColor: "primary.main",
          },
          m: 2,
        }}
        onClick={onClick}
      >
        <CardActionArea>
          <Box sx={{ position: "absolute", top: 8, right: 12 }}>
            <Chip
              label={status}
              color="primary"
              size="small"
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "10px",
                padding: "2px 4px",
              }}
            />
          </Box>
          <CardContent>
            <Box display="flex" flexDirection="row" height={250} gap={2} mt={2}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>
                {getInitials(authorName.toUpperCase())}
              </Avatar>
              <Stack direction="column" mt={1} width="100%">
                <Typography
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "18px",
                    color: "grey.900",
                    height: "80px",
                  }}
                  gutterBottom
                >
                  {truncateText(title, 110)}
                </Typography>
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                >
                  Keywords: {truncateText(keywords, 150)}
                </Typography>
                <Typography
                  sx={{
                    color: "grey.800",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                >
                  Author: {authorName}
                </Typography>
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                >
                  Co-Authors: {truncateText(coAuthor, 50)}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey.800",
                    fontSize: "14px",
                  }}
                  gutterBottom
                >
                  Submitted: {fDate(new Date(createdAt))}
                </Typography>
                {reviewDueDate && (
                  <Box mt={1}>
                    <Typography
                      sx={{ color: "grey.800", fontSize: "14px" }}
                      gutterBottom
                    >
                      Review Due Date : {formatDate(reviewDueDate)}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={2}
              mt={2}
            >
              {manuscriptLink && (
                <Typography
                  component="a"
                  href={manuscriptLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontSize: "12px",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  View Manuscript
                </Typography>
              )}
              {otherDocsLink && (
                <Typography
                  component="a"
                  href={otherDocsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontSize: "12px",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  View Other Docs
                </Typography>
              )}
              <Box display="flex" justifyContent="flex-end">
                <Box display="flex" justifyContent="space-between" gap={1}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      // padding: "2px",
                      "&:hover": { boxShadow: "none" },
                    }}
                    onClick={handleReviewClick}
                  >
                    Review
                  </Button>
                  {status !== "ACCEPTED" && (
                    <Button
                      onClick={handleAcceptManuscript}
                      variant="outlined"
                      sx={{
                        // padding: "2px",
                        textTransform: "none",

                        borderRadius: "50px",
                      }}
                    >
                      Accept
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Review Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Review and Chat</DialogTitle>
        <DialogContent>
          <Chat manuscriptId={manuscript.id} />

          {!hasReview && (
            <>
              <TextField
                label="Comments"
                multiline
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                fullWidth
                sx={{ my: 2 }}
              />
              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Recommendation</InputLabel>
                <Select
                  value={selectedRecommendation}
                  onChange={(e) => setSelectedRecommendation(e.target.value)}
                  label="Recommendation"
                >
                  {recommendation.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {!hasReview && (
            <>
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
