"use client";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllManuscripts } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

import { Approved } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Approved";
import { AwaitingReview } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/AwaitingReview";
import { Rejected } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Rejected";
import { TotalSubmitted } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/TotalSubmitted";
import { QuickActionsPanel } from "@/app/components/@dashboard/components/@dashboard/common/analytics/quick-actions-panel";
import { RecentManuscriptsCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/recent-manuscripts-card";
import { StatusBreakdownCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/status-breakdown-card";

const EditorInChiefMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [manuscripts, setManuscripts] = useState<ManuscriptProps[]>([]);
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
        const list: ManuscriptProps[] = await getAllManuscripts();
        if (Array.isArray(list)) {
          setManuscripts(list);
          setData({
            totalSubmitted: list.length,
            awaitingReview: list.filter(
              (m) =>
                m.status?.toLowerCase() === "under_review" ||
                m.status?.toLowerCase() === "submitted" ||
                m.status?.toLowerCase() === "pending",
            ).length,
            rejected: list.filter(
              (m) => m.status?.toLowerCase() === "rejected",
            ).length,
            approved: list.filter(
              (m) =>
                m.status?.toLowerCase() === "accepted" ||
                m.status?.toLowerCase() === "approved",
            ).length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch editor-in-chief metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = {
    submitted: manuscripts.filter((m) =>
      ["submitted", "pending"].includes(m.status?.toLowerCase()),
    ).length,
    underReview: manuscripts.filter(
      (m) => m.status?.toLowerCase() === "under_review",
    ).length,
    accepted: manuscripts.filter((m) =>
      ["accepted", "approved"].includes(m.status?.toLowerCase()),
    ).length,
    rejected: manuscripts.filter(
      (m) => m.status?.toLowerCase() === "rejected",
    ).length,
    total: manuscripts.length,
  };

  return (
    <>
      {/* Stat cards */}
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

      {/* Analytics panels */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <StatusBreakdownCard counts={statusCounts} loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentManuscriptsCard
            manuscripts={manuscripts}
            loading={loading}
            title="Recent Submissions"
          />
        </Grid>
      </Grid>

      {/* Quick actions */}
      <QuickActionsPanel role="editor-in-chief" />
    </>
  );
};

export default EditorInChiefMetrics;
