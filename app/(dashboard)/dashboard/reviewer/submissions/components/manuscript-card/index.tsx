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
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {  useState } from "react";
import { makeRecommendationReviewer } from "@/app/api/reviewer";
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

interface MakeRecommendationPayload {
  recommendation: "ACCEPT" | "REJECT";
  remark?: string;
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
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false);
  const [recommendationRemark, setRecommendationRemark] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<"ACCEPT" | "REJECT" | "">("");
  const { notify } = useNotification();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleReviewClick = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleRecommendationDialogOpen = (action: "ACCEPT" | "REJECT") => {
    setSelectedAction(action);
    setRecommendationDialogOpen(true);
    setMenuAnchorEl(null);
  };

  const handleRecommendationDialogClose = () => {
    setRecommendationDialogOpen(false);
    setRecommendationRemark("");
    setSelectedAction("");
  };

  const handleRecommendation = async () => {
    if (!selectedAction) return;

    const payload: MakeRecommendationPayload = {
      recommendation: selectedAction,
      remark: recommendationRemark || undefined,
    };
    try {
      await makeRecommendationReviewer(manuscript.id, payload);
      notify(`Manuscript ${selectedAction.toLowerCase()} successfully`);
      setRecommendationDialogOpen(false);
      setRecommendationRemark("");
      setSelectedAction("");
    } catch (error) {
      notify(`Failed to ${selectedAction.toLowerCase()} manuscript`);
      console.error(`Error ${selectedAction.toLowerCase()} manuscript:`, error);
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
            {status !== "ACCEPT" && status !== "REJECT" && (
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleRecommendationDialogOpen("ACCEPT")}>
              Accept
            </MenuItem>
            <MenuItem onClick={() => handleRecommendationDialogOpen("REJECT")}>
              Reject
            </MenuItem>
          </Menu>
          <CardContent>
            <Box display="flex" flexDirection="row" height={250} gap={2} mt={2}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>
                {getInitials((authorName ?? "").toUpperCase())}
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
                      Review Due Date: {formatDate(reviewDueDate)}
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
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    "&:hover": { boxShadow: "none" },
                  }}
                  onClick={handleReviewClick}
                >
                  Review
                </Button>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Recommendation Dialog */}
      <Dialog
        open={recommendationDialogOpen}
        onClose={handleRecommendationDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedAction
            ? `${selectedAction.charAt(0) + selectedAction.slice(1).toLowerCase()} Manuscript`
            : "Make Recommendation"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {selectedAction === "REJECT"
              ? "Are you sure you want to reject this manuscript? Please provide a remark (optional)."
              : `Please provide a remark for ${selectedAction.toLowerCase()} (optional).`}
          </Typography>
          <TextField
            label="Remark (Optional)"
            multiline
            rows={4}
            value={recommendationRemark}
            onChange={(e) => setRecommendationRemark(e.target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRecommendationDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRecommendation}
            variant="contained"
            color={selectedAction === "REJECT" ? "error" : "primary"}
          >
            {selectedAction ? selectedAction.charAt(0) + selectedAction.slice(1).toLowerCase() : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}