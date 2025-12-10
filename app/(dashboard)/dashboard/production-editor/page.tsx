import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";
import { Typography, Paper, Box } from "@mui/material";

export const metadata = {
  title: "Production Editor",
};

const ProductionEditorHome = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Dashboard" />
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Welcome to the Production Editor workspace
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Use the navigation to manage manuscripts and users assigned to the
            production team.
          </Typography>
        </Box>
      </Paper>
    </PageLayout>
  );
};

export default ProductionEditorHome;
