"use client";

import { useEffect, useState } from "react";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { getVolume } from "@/api/service/volume";
import { getPublishedManuscript } from "@/api/service/manuscript";
import ManuscriptCard from "../manuscript-card";
import { Volume, Issue, Manuscript } from "@/types";
import ManuscriptCardSkeleton from "../manuscript-card/loader";
import VolumeDropdownSkeleton from "../loader/volume";
import NoManuscriptPlaceholder from "./empty-catalogue";

export default function VolumeIssueSelector() {
  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // Fetch volumes
  const { data: volumesData = [] as Volume[], isLoading: isLoadingVolumes } = useQuery({
    queryKey: ["volumes"],
    queryFn: async () => {
      const response = await getVolume();
      console.log("Fetched volumes:", response);
      return response;
    },
  });

  // Restore selections from localStorage on mount
  useEffect(() => {
    const storedVolumeId = localStorage.getItem("selectedVolumeId");
    const storedIssueId = localStorage.getItem("selectedIssueId");

    if (volumesData.length > 0) {
      let volume = (volumesData as Volume[])[0]; // Default to first volume
      let issue = volume.issues[0] || null;

      // Override with stored values if they exist and are valid
      if (storedVolumeId) {
        const foundVolume = volumesData.find((v: Volume) => v.id === storedVolumeId);
        if (foundVolume) {
          volume = foundVolume;
          issue =
            storedIssueId && foundVolume.issues.length
              ? foundVolume.issues.find((i: Issue) => i.id === storedIssueId) ||
                foundVolume.issues[0]
              : null;
        }
      }

      setSelectedVolume(volume);
      setSelectedIssue(issue);
    }
  }, [volumesData]);

  // Save selections to localStorage whenever they change
  useEffect(() => {
    if (selectedVolume) {
      localStorage.setItem("selectedVolumeId", selectedVolume.id);
    }
    if (selectedIssue) {
      localStorage.setItem("selectedIssueId", selectedIssue.id);
    }
  }, [selectedVolume, selectedIssue]);

  // Fetch manuscripts
  const { data: manuscripts, isLoading: isLoadingManuscripts } = useQuery({
    queryKey: [
      "manuscripts",
      selectedVolume?.id,
      selectedIssue?.id,
      page,
      query,
    ],
    queryFn: async () =>
      getPublishedManuscript(
        undefined,
        page,
        10,
        query,
        selectedIssue?.id,
        selectedVolume?.id,
      ),
    enabled: !!selectedVolume && !!selectedIssue,
  });

  return (
    <div className="p-1 md:p-4">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-2 mt-2 md:mt-0 md:gap-4">
          {/* Volume Selector */}
          {isLoadingVolumes ? (
            <VolumeDropdownSkeleton />
          ) : (
            <div className="relative w-64">
              <label className="block text-xs font-semibold text-primary">
                Volume
              </label>
              <div className="relative">
                <select
                  className="mt-1 appearance-none w-full p-1 md:p-2 border border-primary bg-white rounded-lg text-gray-700 focus:ring-2 focus:ring-primary"
                  value={selectedVolume?.id || ""}
                  onChange={(e) => {
                    const volume = volumesData.find(
                      (v: Volume) => v.id === e.target.value,
                    );
                    setSelectedVolume(volume || null);
                    setSelectedIssue(volume?.issues[0] || null);
                    setPage(1);
                  }}
                  disabled={isLoadingVolumes}
                >
                  {volumesData.map((volume: Volume) => (
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
          )}

          {/* Issue Selector */}
          {isLoadingVolumes || !selectedVolume ? (
            <VolumeDropdownSkeleton />
          ) : (
            <div className="relative w-64">
              <label className="block text-xs font-semibold text-primary">
                Issue
              </label>
              <div className="relative">
                <select
                  className="mt-1 appearance-none w-full p-1 md:p-2 border border-primary bg-white rounded-lg text-gray-700 focus:ring-2 focus:ring-primary"
                  value={selectedIssue?.id || ""}
                  onChange={(e) => {
                    const issue = selectedVolume?.issues.find(
                      (i) => i.id === e.target.value,
                    );
                    setSelectedIssue(issue || null);
                    setPage(1);
                  }}
                  disabled={
                    !selectedVolume || selectedVolume.issues.length === 0
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
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full mt-4 max-w-md ml-auto">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <MagnifyingGlass
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Manuscript List */}
      {selectedVolume && selectedIssue && (
        <div className="mt-6 space-y-6">
          {isLoadingManuscripts ? (
            [...Array(5)].map((_, index) => (
              <ManuscriptCardSkeleton key={index} />
            ))
          ) : manuscripts?.data?.length ? (
            manuscripts.data.map((manuscript: Manuscript) => (
              <ManuscriptCard key={manuscript.id} manuscript={manuscript} />
            ))
          ) : (
            <NoManuscriptPlaceholder />
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {manuscripts && manuscripts.meta && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!manuscripts.meta.hasPreviousPage}
          >
            Previous
          </button>
          <span className="py-2">
            Page {manuscripts.meta.page} of {manuscripts.meta.pageCount}
          </span>
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!manuscripts.meta.hasNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}