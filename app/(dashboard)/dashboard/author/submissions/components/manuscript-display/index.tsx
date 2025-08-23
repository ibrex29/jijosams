import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

import { ManuscriptProps } from "@/types";
import noResultIcon from "@/public/images/no_upcoming.svg";
import noManuscriptIcon from "@/public/images/no-tickets.svg";

import ManuscriptContent from "./inner-manuscript-display";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";

interface ManuscriptDisplayProps {
  manuscripts: ManuscriptProps[];
  isFetching: boolean;
  availableManuscripts: boolean;
}

const ManuscriptsDisplay: React.FC<ManuscriptDisplayProps> = ({
  manuscripts,
  isFetching,
  availableManuscripts,
}) => {
  const [view, setView] = useState<"card" | "table" | "list">("card");

  return (
    <Box>
      <ManuscriptSubHeader
        title="Submitted Manuscripts"
        subtitle="Track and manage the manuscripts you’ve submitted.
"
      />

      <Paper sx={{backgroundColor: "white",
          py: 1,
          mx: "-30px",
          px: "30px",
          my: 0,
          boxShadow: "none",
        borderColor: "grey.300",
      }} >
        {/* Toggle view for desktop */}
      <Box display={{ xs: "none", md: "flex" }} justifyContent="flex-end" mb={2}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => val && setView(val)}
            size="small"
            style={{ borderRadius: "8px" , fontSize: "12px" }}
        >
          <ToggleButton style={{ padding: "4px 22px" }} value="card">Card</ToggleButton>
          <ToggleButton style={{ padding: "4px 22px" }} value="table">Table</ToggleButton>
          <ToggleButton style={{ padding: "4px 22px" }} value="list">List</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ManuscriptContent
        isFetching={isFetching}
        manuscripts={manuscripts}
        availableManuscripts={availableManuscripts}
        noManuscriptsIcon={noManuscriptIcon}
        noResultManuscriptIcon={noResultIcon}
        view={view}
      />

      </Paper>

      
    </Box>
  );
};

export default ManuscriptsDisplay;
