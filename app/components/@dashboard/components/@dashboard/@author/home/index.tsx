"use client";

import { Box } from "@mui/material";

import Metrics from "../../common/metrics";
import PageBreadcrumbs from "../../common/page/breadcrumbs";
import { MainBox } from "../../common/styled-components";

const AuthorHome: React.FC = () => {
  return (
    <main>
      <MainBox>
        <Box sx={{ marginBottom: "20px", marginTop: "-5px" }}>
          <PageBreadcrumbs page="Home" tab="" />
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Metrics />
        </Box>
      </MainBox>
    </main>
  );
};

export default AuthorHome;
