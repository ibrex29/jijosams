import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot icon
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { closeReview, createReviewerReply, getReplies, openReview } from "@/app/api/reviewer";
import { Review } from "@/app/types";
import { formatDate } from "@/app/utils";

interface ChatProps {
  manuscriptId: string;
}

const Chat: React.FC<ChatProps> = ({ manuscriptId }) => {
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [reviewId, setReviewId] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [uploadFiles, setUploadFiles] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the three-dot menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  // State for review status (open/close)
  const [isReviewClose, setIsReviewClose] = useState<boolean>(false); 

  // Fetch review data
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const data = await getReplies(manuscriptId);
        if (data && Array.isArray(data) && data.length > 0) {
          setReviewData(data[0]);
          setReviewId(data[0].id);
          // Use the 'isClosed' value to set the state
          setIsReviewClose(data[0].isClosed); // If 'isClosed' is true, the review is not open
          console.log("isClosed:", data[0].isClosed);
            console.log("isClosed:", data[0].id);

        } else {
          console.warn("No review data found");
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [manuscriptId]);

  // Handle Reply Submission
  const handleReplySubmit = async () => {
    if (!reviewData) return;

    setIsSubmitting(true);
    try {
      const replyPayload = {
        reviewId: reviewData.id,
        subject,
        contents,
        uploadFiles,
      };

      const response = await createReviewerReply(replyPayload); // Call API to create reply
      console.log(response);
      // Reset form fields after successful submission
      setSubject("");
      setContents("");
      setUploadFiles(null);

      // Refresh review data to show the new reply
      const data = await getReplies(manuscriptId);
      setReviewData(data[0]);
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open/Close menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle "Close Review" action
  const handleCloseReview = async () => {
    if (!reviewData) return;

    try {
      const response = await closeReview(reviewId);
      console.log(response);

      setIsReviewClose(true); // Update local state
    } catch (error) {
      console.error("Error closing review:", error);
    } finally {
      handleMenuClose(); // Close the menu
    }
  };

  // Handle "Open Review" action

  const handleOpenReview = async () => {
    if (!reviewData) return;

    try {
      const response = await openReview(reviewId);
      console.log(response);
      setIsReviewClose(false); // Update local state
    } catch (error) {
      console.error("Error opening review:", error);
    } finally {
      handleMenuClose(); // Close the menu
    }
  };

  if (!reviewData) {
    return (
      <Typography>
        No Chats, create a review to start a conversation.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxHeight: 500, overflowY: "auto", mb: 2 }}>
      {/* Main Review Section */}
      <Box sx={{ mb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Reviewer Info */}
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>R</Avatar>
            <Typography variant="body2" color="textSecondary">
              Reviewer - {formatDate(reviewData.reviewDate)}
            </Typography>
          </Box>

          {/* Three-Dot Menu */}
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {isReviewClose ? (
              <MenuItem onClick={handleOpenReview}>Open Review</MenuItem>
            ) : (
              <MenuItem onClick={handleCloseReview}>Close Review</MenuItem>
            )}
          </Menu>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {reviewData.comments}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Replies Section */}
      {reviewData.Reply.map((reply) => (
        <Box key={reply.id} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: reply.isauthor ? "primary.main" : "secondary.main",
                mr: 1,
              }}
            >
              {reply.isauthor ? "A" : "R"}
            </Avatar>
            <Typography variant="body2" color="textSecondary">
              {reply.isauthor ? "Author" : "Reviewer"} -{" "}
              {formatDate(reply.createdAt)}
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
            {reply.subject}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {reply.contents}
          </Typography>
          {reply.uploadFiles && (
            <Typography
              component="a"
              href={reply.uploadFiles}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontSize: "14px",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View Attachment
            </Typography>
          )}
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}

      {/* Reply Form */}
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Reply"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Attachment URL"
          variant="outlined"
          fullWidth
          value={uploadFiles || ""}
          onChange={(e) => setUploadFiles(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReplySubmit}
          disabled={isSubmitting || !subject || !contents}
        >
          {isSubmitting ? "Submitting..." : "Reply"}
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
