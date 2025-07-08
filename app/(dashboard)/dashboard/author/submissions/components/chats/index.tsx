import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { createAuthorReply, getReplies } from "@/api/reviewer";
import { Review } from "@/types";
import { formatDate } from "@/utils";

interface ChatProps {
  manuscriptId: string;
}

const AuthorChat: React.FC<ChatProps> = ({ manuscriptId }) => {
  const [reviewData, setReviewData] = useState<Review | null>(null);
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [uploadFiles, setUploadFiles] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const data = await getReplies(manuscriptId);
        if (data && Array.isArray(data) && data.length > 0) {
          setReviewData(data[0]);
          console.log(data);
        } else {
          console.warn("No review data found");
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [manuscriptId]);

  const handleReplySubmit = async () => {
    if (!reviewData) return;

    setIsSubmitting(true);
    try {
      const replyPayload = {
        reviewId: reviewData.id,
        subject,
        contents,
        uploadFiles, // Optional file URL
      };

      const response = await createAuthorReply(replyPayload); // Call API to create reply
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
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>R</Avatar>
          <Typography variant="body2" color="textSecondary">
            Reviewer - {formatDate(reviewData.reviewDate)}
          </Typography>
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

      {/* Status for Closed Review */}
      {reviewData.isClosed && (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          This chat has been closed. No further replies can be added.
        </Typography>
      )}

      {/* Reply Form */}
      {!reviewData.isClosed && (
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
      )}
    </Box>
  );
};

export default AuthorChat;
