import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getREManuscript, getReviewerMetrics } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

import { Accepted } from "./cards/Accepted";
import { Assigned } from "./cards/Assigned";
import { AwaitingReview } from "./cards/AwaitingReview";
import { Submitted } from "./cards/Submitted";
import { QuickActionsPanel } from "@/app/components/@dashboard/components/@dashboard/common/analytics/quick-actions-panel";
import { RecentManuscriptsCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/recent-manuscripts-card";
import { StatusBreakdownCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/status-breakdown-card";

const ReviewerMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [manuscripts, setManuscripts] = useState<ManuscriptProps[]>([]);
  const [data, setData] = useState({
    totalSubmitted: 0,
    awaitingReview: 0,
    assigned: 0,
    accepted: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getReviewerMetrics();
        setData({
          totalSubmitted: response.manuscriptCounts.submitted,
          awaitingReview: response.manuscriptCounts.under_review,
          assigned: response.manuscriptCounts.assigned,
          accepted: response.manuscriptCounts.accepted,
        });
        // fetch list for recent manuscripts panel
        const list: ManuscriptProps[] = await getREManuscript();
        if (Array.isArray(list)) setManuscripts(list);
      } catch (error) {
        console.error("Failed to fetch reviewer metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = {
    submitted: data.totalSubmitted,
    underReview: data.awaitingReview,
    accepted: data.accepted,
    rejected: 0,
    total: data.assigned,
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <Submitted
            sx={{ height: "100%" }}
            value={data.totalSubmitted?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <AwaitingReview
            sx={{ height: "100%" }}
            value={data.awaitingReview?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Assigned
            sx={{ height: "100%" }}
            value={data.assigned?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Accepted
            sx={{ height: "100%" }}
            value={data.accepted?.toString() || "0"}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <StatusBreakdownCard counts={statusCounts} loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentManuscriptsCard
            manuscripts={manuscripts}
            loading={loading}
            title="My Review Assignments"
            emptyLabel="You have no manuscripts assigned for review yet."
          />
        </Grid>
      </Grid>

      <QuickActionsPanel role="reviewer" />
    </>
  );
};

export default ReviewerMetrics;
