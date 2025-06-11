import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getAuthorMetrics } from "@/app/api/manuscript";

import { Approved } from "./cards/Approved";
import { AwaitingReview } from "./cards/AwaitingReview";
import { Rejected } from "./cards/Rejected";
import { TotalSubmitted } from "./cards/TotalSubmitted";

const Metrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalSubmitted: 0,
    awaitingReview: 0,
    rejected: 0,
    approved: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await getAuthorMetrics();
        // Assuming response is structured as mentioned in the API response
        setData({
          totalSubmitted: response.submittedCount,
          awaitingReview: response.underReviewCount, // Assuming 'awaitingReview' is equivalent to 'underReviewCount'
          rejected: response.rejectedCount, // You can modify this based on your requirements
          approved: response.acceptedCount,
        });
      } catch (error) {
        console.error("Failed to fetch author metrics:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalSubmitted
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
        <Rejected
          sx={{ height: "100%" }}
          value={data.rejected?.toString() || "0"}
          loading={loading}
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <Approved
          sx={{ height: "100%" }}
          value={data.approved?.toString() || "0"}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default Metrics;
