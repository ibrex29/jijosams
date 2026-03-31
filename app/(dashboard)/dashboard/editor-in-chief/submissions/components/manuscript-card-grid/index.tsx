import { Box, Grid } from "@mui/material";
import { useState } from "react";

import SectionModal from "@/app/(dashboard)/dashboard/managing-editor/sections/components/section-dialog";
import { assignManuscriptReviewer, assignManuscriptSection } from "@/app/api/manuscript/assign-manuscript";
import { assignSuggestedReviewer } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

import CEManuscriptCard from "../manuscript-card";
import useNotification from "@/hooks/useNotification";
import ReviewerModal from "@/app/(dashboard)/dashboard/section-editor/submissions/components/reviewer-dialog";
import ReviewViewerModal from "@/app/(dashboard)/dashboard/common/review-viewer-modal";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function ManuscriptCardGrid({ manuscripts, refetch }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [openReviewViewer, setOpenReviewViewer] = useState(false);
  
    const { notify } = useNotification();
  

  const handleSectionClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenSectionModal(true);
  };

  // Updated handleAssignSection using the new function
  const handleAssignSection = async (sectionId: string) => {
    if (!selectedManuscript) return;

    const payload = {
      manuscriptId: selectedManuscript.id,
      sectionId,
    };

    try {
      await assignManuscriptSection(payload); // Call the new function
      console.log(`Manuscript assigned to section ${sectionId}`);
      refetch();
    } catch (error) {
      console.error("Failed to assign section:", error);
    } finally {
      setOpenSectionModal(false);
    }
  };

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

  const handleAssignSuggestedReviewer = async (payload: {
    suggestedReviewerId: string;
    sectionId: string;
    reviewDueDate: string;
  }) => {
    try {
      await assignSuggestedReviewer(payload);
      notify("Suggested reviewer added & assigned successfully");
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      console.error("Error assigning suggested reviewer:", error);
      notify("Failed to assign suggested reviewer");
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <CEManuscriptCard
              manuscript={manuscript}
              onReviewClick={() => handleReviewClick(manuscript)}
              onSectionClick={() => handleSectionClick(manuscript)}
              onViewReviews={() => handleViewReviews(manuscript)}
              selected={selectedManuscript?.id === manuscript.id}
            />
          </Grid>
        ))}
      </Grid>

      {selectedManuscript && (
        <SectionModal
          manuscript={selectedManuscript}
          open={openSectionModal}
          onClose={() => setOpenSectionModal(false)}
          onAssign={handleAssignSection}
        />
      )}

      {selectedManuscript && (
              <ReviewerModal
                manuscript={selectedManuscript}
                open={openReviewModal}
                onClose={() => setOpenReviewModal(false)}
                onAssign={handleAssignReviewer}
                onAssignSuggested={handleAssignSuggestedReviewer}
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
