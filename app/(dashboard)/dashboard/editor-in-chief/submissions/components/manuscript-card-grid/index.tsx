import { Box, Grid } from "@mui/material";
import { useState } from "react";

import SectionModal from "@/app/(dashboard)/dashboard/managing-editor/sections/components/section-dialog";
import { assignManuscriptSection } from "@/app/api/manuscript/assign-manuscript";
import { ManuscriptProps } from "@/app/types";

import CEManuscriptCard from "../manuscript-card";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function ManuscriptCardGrid({ manuscripts, refetch }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);

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

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <CEManuscriptCard
              manuscript={manuscript}
              onReviewClick={() => console.log("Review click", manuscript)}
              onSectionClick={() => handleSectionClick(manuscript)}
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
    </Box>
  );
}
