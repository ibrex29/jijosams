import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getReviewerMetrics } from "@/app/api/manuscript";

import { Accepted } from "./cards/Accepted";
import { Assigned } from "./cards/Assigned";
import { AwaitingReview } from "./cards/AwaitingReview";
import { Submitted } from "./cards/Submitted";

const ReviewerMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
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
        console.log(response);
        setData({
          totalSubmitted: response.manuscriptCounts.submitted,
          awaitingReview: response.manuscriptCounts.under_review,
          assigned: response.manuscriptCounts.assigned,
          accepted: response.manuscriptCounts.accepted,
        });
      } catch (error) {
        console.error("Failed to fetch author metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
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
  );
};

export default ReviewerMetrics;
