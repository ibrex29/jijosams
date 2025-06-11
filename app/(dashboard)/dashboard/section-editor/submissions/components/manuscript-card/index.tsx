import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import Iconify from "@/app/components/@dashboard/iconify";
import { ManuscriptProps } from "@/app/types";
import { formatDate, getInitials, truncateText } from "@/app/utils";
import { fDate } from "@/app/utils/format-time";

interface Props {
  manuscript: ManuscriptProps;
  onReviewClick: () => void;
  selected: boolean;
}

// ME -- Managing Editor
export default function SEManuscriptCard({
  manuscript,
  onReviewClick,
  selected,
}: Props) {
  const {
    title,
    keywords,
    author,
    coAuthor,
    status,
    createdAt,
    Document,
    sectionId,
    Section,
    reviewerId,
    reviewDueDate,
  } = manuscript;

  const manuscriptLink = Document[0]?.manuscriptLink || "";
  const otherDocsLink = Document[0]?.otherDocsLink || "";

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", md: 700 },
        height: { xs: 600, md: 345 },
        borderRadius: "12px",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        border: selected ? "2px solid" : "1px solid",
        borderColor: selected ? "primary.main" : "grey.300",
        m: 2,
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "absolute", top: 8, right: 3 }}>
          <Typography
            variant="caption"
            sx={{
              backgroundColor:
                status === "SUBMITTED"
                  ? "primary.main" // or another color like 'primary.light'
                  : status === "UNDER_REVIEW"
                    ? "info.main"
                    : status === "PUBLISHED"
                      ? "success.main"
                      : "primary.main", // fallback color
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            {status}
          </Typography>
        </Box>
        <CardContent>
          <Box display="flex" flexDirection="row" height={250} gap={2} mt={2}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>
              {getInitials(author.toUpperCase())}
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
                {truncateText(title, 150)}
              </Typography>
              <Typography
                sx={{ color: "grey.600", fontSize: "14px" }}
                gutterBottom
              >
                Keywords: {truncateText(keywords, 150)}
              </Typography>
              <Typography
                sx={{ color: "grey.800", fontSize: "14px" }}
                gutterBottom
              >
                Author: {author}
              </Typography>
              <Typography
                sx={{ color: "grey.600", fontSize: "14px" }}
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
              {sectionId && (
                <Box mt={1}>
                  <Typography
                    sx={{ color: "grey.800", fontSize: "14px" }}
                    gutterBottom
                  >
                    Section : {Section?.name}
                  </Typography>
                </Box>
              )}
              {reviewerId && (
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
          <Divider sx={{ my: 1 }} />
          <Stack direction="column" width="100%" spacing={1}>
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
                    fontSize: "12px",
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
                    fontSize: "12px",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Other Documents
                </Typography>
              )}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "12px",
                    "&:hover": { boxShadow: "none" },
                  }}
                  onClick={onReviewClick}
                >
                  Assign to a Reviewer
                </Button>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
