import { Box, Grid } from "@mui/material";
import { useState } from "react";

import { assignManuscriptReviewer } from "@/app/api/manuscript/assign-manuscript";
import { ManuscriptProps } from "@/types";

import SEManuscriptCard from "../manuscript-card";
import ReviewerModal from "../reviewer-dialog";
import ReviewViewerModal from "@/app/(dashboard)/dashboard/common/review-viewer-modal";
import useNotification from "@/hooks/useNotification";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function ManuscriptCardGrid({ manuscripts, refetch }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openReviewViewer, setOpenReviewViewer] = useState(false);

  const { notify } = useNotification();

  const handleReviewClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewModal(true);
  };

  const handleViewReviews = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewViewer(true);
  };

  const handleAssignReviewer = async (
    reviewerId: string,
    manuscriptId: string,
    reviewDueDate: string,
  ) => {
    try {
      console.log(
        `Assigning reviewer: ${reviewerId} to manuscript: ${manuscriptId} with due date: ${reviewDueDate}`,
      );
      const response = await assignManuscriptReviewer({
        manuscriptId,
        reviewerIds: [reviewerId],
        reviewDueDate,
      });
      console.log(response);

      notify("Reviewer assigned successfully ");
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      console.error(`Error assigning reviewer:`, error);
      notify("Failed to assign reviewer ");
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <SEManuscriptCard
              manuscript={manuscript}
              onReviewClick={() => handleReviewClick(manuscript)}
              onViewReviews={() => handleViewReviews(manuscript)}
              selected={selectedManuscript?.id === manuscript.id}
            />
          </Grid>
        ))}
      </Grid>
      {selectedManuscript && (
        <ReviewerModal
          manuscript={selectedManuscript}
          open={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          onAssign={handleAssignReviewer}
        />
      )}
      {selectedManuscript && (
        <ReviewViewerModal
          manuscriptId={selectedManuscript.id}
          manuscriptTitle={selectedManuscript.title}
          open={openReviewViewer}
          onClose={() => setOpenReviewViewer(false)}
        />
      )}
    </Box>
  );
}
