/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import useNotification from "@/hooks/useNotification";
import {
  closeReview,
  createReview,
  createReviewerReply,
  getReplies,
  openReview,
} from "@/app/api/reviewer";
import { Reply } from "@/types";
import { formatDate } from "@/utils";
import DocumentUpload from "@/app/components/document-upload";

interface ChatProps {
  manuscriptId: string;
}

interface ReplyFormData {
  subject: string;
  contents: string;
  uploadFiles: string | null;
}

const Chat: React.FC<ChatProps> = ({ manuscriptId }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
  const [newReviewComments, setNewReviewComments] = useState("");
  const [newReviewRecommendation, setNewReviewRecommendation] = useState("");
  const isMenuOpen = Boolean(menuAnchorEl);
  const queryClient = useQueryClient();
  const { notify } = useNotification();
  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<ReplyFormData>({
    defaultValues: {
      subject: "",
      contents: "",
      uploadFiles: null,
    },
  });

  // Fetch review data with TanStack Query
  const { data: reviewData, isLoading, error } = useQuery({
    queryKey: ["review", manuscriptId],
    queryFn: () => getReplies(manuscriptId).then((data) => (data && Array.isArray(data) && data.length > 0 ? data[0] : null)),
  });

  console.log(reviewData);

  // Mutations for reply, open, close, and create review
  const replyMutation = useMutation({
    mutationFn: createReviewerReply,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
      notify("Reply submitted successfully");
    },
    onError: (error) => {
      console.error("Error submitting reply:", error);
      notify("Failed to submit reply");
    },
  });

  const closeReviewMutation = useMutation({
    mutationFn: closeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
      notify("Review closed successfully");
    },
    onError: (error) => {
      console.error("Error closing review:", error);
      notify("Failed to close review");
    },
  });

  const openReviewMutation = useMutation({
    mutationFn: openReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
      notify("Review opened successfully");
    },
    onError: (error) => {
      console.error("Error opening review:", error);
      notify("Failed to open review");
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      setNewReviewComments("");
      setNewReviewRecommendation("");
      setShowCreateReviewForm(false);
      queryClient.invalidateQueries({ queryKey: ["review", manuscriptId] });
      notify("Review created successfully");
    },
    onError: (error) => {
      console.error("Error creating review:", error);
      notify("Failed to create review");
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
  const onSubmit = (data: ReplyFormData) => {
    if (!reviewData) return;

    replyMutation.mutate({
      reviewId: reviewData.id,
      subject: data.subject,
      contents: data.contents,
      uploadFiles: data.uploadFiles,
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

  // Handle "Create Review" action
  const handleCreateReviewSubmit = () => {
    if (!newReviewComments || !newReviewRecommendation) {
      notify("Comments and recommendation are required");
      return;
    }
    createReviewMutation.mutate({
      manuscriptId,
      comments: newReviewComments,
      recommendation: newReviewRecommendation,
    });
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
      <Card sx={{ p: 2 }}>
        <Typography sx={{ mb: 2 }}>
          No chats available. Create a review to start a conversation.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateReviewForm(true)}
        >
          Create Review
        </Button>
        {showCreateReviewForm && (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Recommendation</InputLabel>
              <Select
                value={newReviewRecommendation}
                onChange={(e) => setNewReviewRecommendation(e.target.value)}
                label="Recommendation"
                size="small"
                disabled={createReviewMutation.isPending}
              >
                <SelectMenuItem value="MINOR_REVISIONS">Minor Revisions</SelectMenuItem>
                <SelectMenuItem value="MAJOR_REVISIONS">Major Revisions</SelectMenuItem>
                <SelectMenuItem value="ACCEPT">Accept</SelectMenuItem>
                <SelectMenuItem value="REJECT">Reject</SelectMenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Comments"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newReviewComments}
              onChange={(e) => setNewReviewComments(e.target.value)}
              sx={{ mb: 2 }}
              disabled={createReviewMutation.isPending}
              error={!!createReviewMutation.error}
              helperText={createReviewMutation.error ? "Failed to create review" : ""}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowCreateReviewForm(false)}
                disabled={createReviewMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleCreateReviewSubmit}
                disabled={createReviewMutation.isPending || !newReviewComments || !newReviewRecommendation}
              >
                {createReviewMutation.isPending ? "Creating..." : "Submit Review"}
              </Button>
            </Box>
          </Box>
        )}
      </Card>
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
            justifyContent={reply.isAuthor ? "flex-end" : "flex-start"}
            mb={2}
          >
            <Box
              sx={{
                maxWidth: "75%",
                bgcolor: reply.isAuthor ? "primary.main" : "grey.200",
                color: reply.isAuthor ? "white" : "text.primary",
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
                    bgcolor: reply.isAuthor ? "primary.dark" : "grey.500",
                  }}
                >
                  {reply.isAuthor ? <PersonIcon /> : "R"}
                </Avatar>
                <Typography variant="caption">
                  {reply.isAuthor ? "Author" : "Reviewer"} •{" "}
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Controller
              name="subject"
              control={control}
              rules={{ required: "Subject is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Subject"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  disabled={replyMutation.isPending}
                />
              )}
            />

            {/* Document upload */}
            <Controller
              name="uploadFiles"
              control={control}
              render={({ fieldState: { error } }) => (
                <div>
                 
                  <DocumentUpload
                    fieldName="uploadFiles"
                    label="Attachment"
                    accept=".doc,.docx,.pdf,.txt,.odt,.rtf,.jpg,.jpeg,.png"
                    onUpload={(url) =>
                      setValue("uploadFiles", url, { shouldValidate: true })
                    }
                    error={error?.message}
                    height="50px" 
                  />
                </div>
              )}
            />

            <Controller
              name="contents"
              control={control}
              rules={{ required: "Reply is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Reply"
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  disabled={replyMutation.isPending}
                />
              )}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={replyMutation.isPending}
              >
                {replyMutation.isPending ? "Submitting..." : "Send Reply"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Chat;