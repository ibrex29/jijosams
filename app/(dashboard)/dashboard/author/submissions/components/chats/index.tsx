import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createAuthorReply, getRepliesAuthor } from "@/app/api/reviewer";
import { Reply } from "@/types";
import { formatDate } from "@/utils";

interface ChatProps {
  manuscriptId: string;
}

const AuthorChat: React.FC<ChatProps> = ({ manuscriptId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");
  const [uploadFiles, setUploadFiles] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews", manuscriptId],
    queryFn: () =>
      getRepliesAuthor(manuscriptId).then((data) =>
        data && Array.isArray(data) ? data : [],
      ),
  });

  console.log("Fetched reviews:", reviews);

  const replyMutation = useMutation({
    mutationFn: createAuthorReply,
    onSuccess: () => {
      setSubject("");
      setContents("");
      setUploadFiles(null);
      queryClient.invalidateQueries({ queryKey: ["reviews", manuscriptId] });
    },
  });

  const handleReplySubmit = () => {
    const reviewData = reviews?.[activeTab];
    if (!reviewData) return;

    replyMutation.mutate({
      reviewId: reviewData.id,
      subject,
      contents,
      uploadFiles,
    });
  };

  if (isLoading) {
    return (
      <Card sx={{ p: 2 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={100} sx={{ mt: 1 }} />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Failed to load review data.{" "}
        <Button
          size="small"
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ["reviews", manuscriptId],
            })
          }
        >
          Retry
        </Button>
      </Alert>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Typography sx={{ p: 2 }}>
        No chats available. Create a review to start a conversation.
      </Typography>
    );
  }

  const reviewData = reviews[activeTab];

  return (
    <Card sx={{ maxHeight: 600, display: "flex", flexDirection: "column" }}>
      {/* Reviewer Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTabs-indicator": {
            height: 2,
            bottom: 0,
          },
        }}
      >
        {reviews.map((r, index) => (
          <Tab
            key={index}
            label={`Reviewer ${index + 1}`}
            icon={<RateReviewIcon fontSize="small" />}
            iconPosition="start"
            sx={{
              minHeight: 50,
              py: 0.5,
              "& .MuiTab-wrapper": {
                gap: "4px",
              },
            }}
          />
        ))}
      </Tabs>

      <CardContent
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Active review */}
        <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>R</Avatar>
            <Typography variant="body2" color="text.secondary">
              Reviewer • {formatDate(reviewData.reviewDate)}
            </Typography>
          </Box>
          <Typography variant="body1">{reviewData.comments}</Typography>
        </Box>

        {/* Replies */}
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

      {/* Reply form (sticky bottom) */}
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
            />
            <TextField
              label="Attachment URL"
              variant="outlined"
              value={uploadFiles || ""}
              onChange={(e) => setUploadFiles(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
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

export default AuthorChat;
