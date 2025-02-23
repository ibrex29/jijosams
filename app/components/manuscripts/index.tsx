"use client";

import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { getVolume } from "@/api/service/volume";
import { getPublishedManuscript } from "@/api/service/manuscript";
import ManuscriptCard from "../manuscript-card";
import { Volume, Issue, Manuscript } from "@/types";

export default function VolumeIssueSelector() {
  const [volumesData, setVolumesData] = useState<Volume[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [manuscriptLoading, setManuscriptLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchVolumes() {
      try {
        setLoading(true);
        const response = await getVolume();
        if (Array.isArray(response)) {
          setVolumesData(response);
          if (response.length > 0) {
            setSelectedVolume(response[0]);
            if (response[0].issues.length > 0) {
              setSelectedIssue(response[0].issues[0]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching volumes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVolumes();
  }, []);

  useEffect(() => {
    if (selectedVolume && selectedVolume.issues.length > 0) {
      setSelectedIssue(selectedVolume.issues[0]);
    } else {
      setSelectedIssue(null);
    }
  }, [selectedVolume]);

  useEffect(() => {
    async function fetchManuscripts() {
      if (!selectedVolume || !selectedIssue) return;
      try {
        setManuscriptLoading(true);
        const response = await getPublishedManuscript(
          undefined,
          1,
          10,
          "",
          selectedIssue.id,
          selectedVolume.id,
        );
        console.log("response", response);
        if (Array.isArray(response.data)) {
          setManuscripts(response.data);
        }
      } catch (error) {
        console.error("Error fetching manuscripts:", error);
      } finally {
        setManuscriptLoading(false);
      }
    }
    fetchManuscripts();
  }, [selectedVolume, selectedIssue]);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        {/* Volume Selector */}
        <div className="relative w-64">
          <label className="block text-xs font-semibold text-primary">
            Volume
          </label>
          <div className="relative">
            <select
              className="mt-1 appearance-none w-full p-2 border border-primary bg-white rounded-lg text-gray-700 focus:ring-2 focus:ring-primary"
              value={selectedVolume?.id || ""}
              onChange={(e) => {
                const volume = volumesData.find((v) => v.id === e.target.value);
                setSelectedVolume(volume || null);
              }}
              disabled={loading}
            >
              {Array.isArray(volumesData) &&
                volumesData.map((volume) => (
                  <option key={volume.id} value={volume.id}>
                    {volume.name}
                  </option>
                ))}
            </select>
            <CaretDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* Issue Selector */}
        <div className="relative w-64">
          <label className="block text-xs font-semibold text-primary">
            Issue
          </label>
          <div className="relative">
            <select
              className="mt-1 appearance-none w-full p-2 border border-primary bg-white rounded-lg text-gray-700 focus:ring-2 focus:ring-primary"
              value={selectedIssue?.id || ""}
              onChange={(e) => {
                const issue = selectedVolume?.issues.find(
                  (i) => i.id === e.target.value,
                );
                setSelectedIssue(issue || null);
              }}
              disabled={
                loading || !selectedVolume || selectedVolume.issues.length === 0
              }
            >
              {selectedVolume?.issues.length ? (
                selectedVolume.issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {issue.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No issues available
                </option>
              )}
            </select>
            <CaretDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Manuscript List */}
      <div className="mt-6 space-y-6">
        {manuscriptLoading ? (
          <p>Loading manuscripts...</p>
        ) : manuscripts.length > 0 ? (
          manuscripts.map((manuscript) => (
            <ManuscriptCard key={manuscript.id} manuscript={manuscript} />
          ))
        ) : (
          <p className="text-gray-500">
            No manuscripts available for this issue.
          </p>
        )}
      </div>
    </div>
  );
}
