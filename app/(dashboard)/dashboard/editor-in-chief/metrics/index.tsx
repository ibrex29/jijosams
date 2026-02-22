"use client";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllManuscripts } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

import { TotalSubmitted } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/TotalSubmitted";
import { AwaitingReview } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/AwaitingReview";
import { Rejected } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Rejected";
import { Approved } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Approved";

const EditorInChiefMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalSubmitted: 0,
    awaitingReview: 0,
    rejected: 0,
    approved: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const manuscripts: ManuscriptProps[] = await getAllManuscripts();
        if (Array.isArray(manuscripts)) {
          const counts = {
            totalSubmitted: manuscripts.length,
            awaitingReview: manuscripts.filter(
              (m) =>
                m.status?.toLowerCase() === "under_review" ||
                m.status?.toLowerCase() === "submitted" ||
                m.status?.toLowerCase() === "pending",
            ).length,
            rejected: manuscripts.filter(
              (m) => m.status?.toLowerCase() === "rejected",
            ).length,
            approved: manuscripts.filter(
              (m) =>
                m.status?.toLowerCase() === "accepted" ||
                m.status?.toLowerCase() === "approved",
            ).length,
          };
          setData(counts);
        }
      } catch (error) {
        console.error("Failed to fetch editor-in-chief metrics:", error);
      } finally {
        setLoading(false);
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

export default EditorInChiefMetrics;
