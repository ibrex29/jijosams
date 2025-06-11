import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import Chat from "@/app/(dashboard)/dashboard/author/submissions/components/chats";
import { getReviewStatus } from "@/app/api/reviewer";
import Iconify from "@/app/components/@dashboard/iconify";
import useNotification from "@/app/hooks/useNotification";
import { ManuscriptProps } from "@/app/types";
import { getInitials, truncateText } from "@/app/utils";
import { fDate } from "@/app/utils/format-time";

interface Props {
  manuscript: ManuscriptProps;
  onClick: () => void;
  selected: boolean;
}

export default function AuthorManuscriptCard({
  manuscript,
  onClick,
  selected,
}: Props) {
  const {
    title,
    // abstract,
    keywords,
    author,
    coAuthor,
    status,
    createdAt,
    Document,
  } = manuscript;

  const { notify } = useNotification();
    const [open, setOpen] = useState(false);


  const manuscriptLink = Document[0]?.manuscriptLink || "";
  const otherDocsLink = Document[0]?.otherDocsLink || "";


  const handleReviewClick = async () => {
  try {
    const response = await getReviewStatus(manuscript.id);
    console.log("Review status response:", response);

    if (response.hasReview)
    {
      
      setOpen(true);
    } else {
      notify("No review available for this manuscript.");
    }
  } catch (error) {
    console.error("Error fetching review status:", error);
    notify("Failed to fetch review status");
  }
};

  const handleClose = () => setOpen(false);
  
  return (
    <>
    <Card
      sx={{
        maxWidth: { xs: "100%", md: 700 },
        height: { xs: 430, md: 380 },
        borderRadius: "12px",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        border: selected ? "2px solid" : "1px solid",
        borderColor: selected ? "primary.main" : "grey.300",
        m: 2,
      }}
      onClick={onClick}
    >
      <CardActionArea>
        <Box sx={{ position: "absolute", top: 8, right: 3 }}>
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            {status}
          </Typography>
        </Box>
        <CardContent>
            <Box display="flex" flexDirection="row"
              sx={{
                  height: { xs: 300, md: 270 }, 
                  gap: 2,
                  mt: 2,
                }}>
              <Avatar sx={{
                width: { xs: 40, sm: 50, md: 60 }, 
                height: { xs: 40, sm: 50, md: 60 },
                bgcolor: "primary.main",
              }}>
              {getInitials(author.toUpperCase())}
            </Avatar>
            <Stack direction="column" mt={1} width="100%">
              <Typography
                sx={{
                  fontWeight: "bolder", 
                  fontSize: { xs: "14px", sm: "14px", md: "16px" },
                  color: "grey.900",
                  height:  { xs: "350px", sm: "350px", md: "240px" },
                }}
                gutterBottom
              >
                {truncateText(title, 150)}
              </Typography>
              {/* <Typography
                sx={{
                  color: 'grey.800',
                  fontSize: '15px',
                  mb: 1,
                  mt: 4,
                }}
                gutterBottom
              >
                Abstract : {truncateText(abstract, 150)}
              </Typography> */}
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
                Author: {author}
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
                <Iconify
                  icon="radix-icons:dot-filled"
                  sx={{ color: "text.primary", mr: 1 }}
                />
                Submitted: {fDate(new Date(createdAt))}
              </Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 2 }} /> {/* Added a divider */}
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
                  fontSize: "14px",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Manuscript
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
                  fontSize: "14px",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Other Documents
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
  </>
  );
}
