import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeReview,
  createReviewerReply,
  getReplies,
  openReview,
} from "@/app/api/reviewer";
import { Reply } from "@/types";
import { formatDate } from "@/utils";

interface ChatProps {
  manuscriptId: string;
}

const Chat: React.FC<ChatProps> = ({ manuscriptId }) => {
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [uploadFiles, setUploadFiles] = useState<string | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const queryClient = useQueryClient();

  // Fetch review data with TanStack Query
  const { data: reviewData, isLoading, error } = useQuery({
    queryKey: ["review", manuscriptId],
    queryFn: () => getReplies(manuscriptId).then((data) => (data && Array.isArray(data) && data.length > 0 ? data[0] : null)),
  });

  // Mutations for reply, open, and close review
  const replyMutation = useMutation({
    mutationFn: createReviewerReply,
    onSuccess: () => {
      setSubject("");
      setContents("");
      setUploadFiles(null);
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
    },
    onError: (error) => {
      console.error("Error submitting reply:", error);
    },
  });

  const closeReviewMutation = useMutation({
    mutationFn: closeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
    },
    onError: (error) => {
      console.error("Error closing review:", error);
    },
  });

  const openReviewMutation = useMutation({
    mutationFn: openReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
    },
    onError: (error) => {
      console.error("Error opening review:", error);
    },
  });

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle Reply Submission
  const handleReplySubmit = () => {
    if (!reviewData) return;

    replyMutation.mutate({
      reviewId: reviewData.id,
      subject,
      contents,
      uploadFiles,
    });
  };

  // Handle "Close Review" action
  const handleCloseReview = () => {
    if (!reviewData) return;

    closeReviewMutation.mutate(reviewData.id);
    handleMenuClose();
  };

  // Handle "Open Review" action
  const handleOpenReview = () => {
    if (!reviewData) return;

    openReviewMutation.mutate(reviewData.id);
    handleMenuClose();
  };

  if (isLoading) {
    return (
      <Card sx={{ p: 2 }}>
        <Typography>Loading...</Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Failed to load review data.{" "}
        <Button
          size="small"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] })}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  if (!reviewData) {
    return (
      <Typography sx={{ p: 2 }}>
        No chats available. Create a review to start a conversation.
      </Typography>
    );
  }

  return (
    <Card sx={{ maxHeight: 600, display: "flex", flexDirection: "column" }}>
      {/* Main Review Section */}
      <CardContent
        sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>R</Avatar>
            <Typography variant="body2" color="text.secondary">
              Reviewer • {formatDate(reviewData.reviewDate)}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {reviewData.isClosed ? (
              <MenuItem onClick={handleOpenReview}>Open Review</MenuItem>
            ) : (
              <MenuItem onClick={handleCloseReview}>Close Review</MenuItem>
            )}
          </Menu>
        </Box>
        <Typography variant="body1">{reviewData.comments}</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Replies Section */}
        {reviewData.Reply.map((reply: Reply) => (
          <Box
            key={reply.id}
            display="flex"
            justifyContent={reply.isauthor ? "flex-end" : "flex-start"}
            mb={2}
          >
            <Box
              sx={{
                maxWidth: "75%",
                bgcolor: reply.isauthor ? "primary.main" : "grey.200",
                color: reply.isauthor ? "white" : "text.primary",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    mr: 1,
                    bgcolor: reply.isauthor ? "primary.dark" : "grey.500",
                  }}
                >
                  {reply.isauthor ? <PersonIcon /> : "R"}
                </Avatar>
                <Typography variant="caption">
                  {reply.isauthor ? "Author" : "Reviewer"} •{" "}
                  {formatDate(reply.createdAt)}
                </Typography>
              </Box>
              {reply.subject && (
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {reply.subject}
                </Typography>
              )}
              <Typography variant="body2">{reply.contents}</Typography>
              {reply.uploadFiles && (
                <Typography
                  component="a"
                  href={reply.uploadFiles}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    mt: 1,
                    fontSize: "0.8rem",
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  📎 View Attachment
                </Typography>
              )}
            </Box>
          </Box>
        ))}

        {/* Closed review message */}
        {reviewData.isClosed && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            This chat has been closed. No further replies can be added.
          </Alert>
        )}
      </CardContent>

      {/* Reply Form (sticky bottom) */}
      {!reviewData.isClosed && (
        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            p: 1.5,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <TextField
              label="Subject"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              size="small"
              fullWidth
              disabled={replyMutation.isPending}
              error={!!replyMutation.error}
              helperText={replyMutation.error ? "Failed to submit reply" : ""}
            />
            <TextField
              label="Attachment URL"
              variant="outlined"
              value={uploadFiles || ""}
              onChange={(e) => setUploadFiles(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
              disabled={replyMutation.isPending}
            />
          </Box>
          <TextField
            label="Reply"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            sx={{ mb: 1.5 }}
            disabled={replyMutation.isPending}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleReplySubmit}
              disabled={replyMutation.isPending || !subject || !contents}
            >
              {replyMutation.isPending ? "Submitting..." : "Send Reply"}
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Chat;