"use client";

import { Box } from "@mui/material";

import EditorInChiefMetrics from "@/app/(dashboard)/dashboard/editor-in-chief/metrics";
import PageBreadcrumbs from "../../common/page/breadcrumbs";
import { MainBox } from "../../common/styled-components";

const CEHome: React.FC = () => {
  return (
    <main>
      <MainBox>
        <Box sx={{ marginBottom: "20px", marginTop: "-5px" }}>
          <PageBreadcrumbs page="Home" tab="" />
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <EditorInChiefMetrics />
        </Box>
      </MainBox>
    </main>
  );
};

export default CEHome;
