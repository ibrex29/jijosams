/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { getVolume } from "@/app/api/(landing-page)/volume";
import { publishManuscript } from "@/app/api/manuscript";
import useNotification from "@/hooks/useNotification";
import { Volume, Issue } from "@/types";

const DocumentUpload = dynamic(
  () => import("@/app/components/document-upload"),
  { ssr: false },
);

const PublishManuscriptInner: React.FC = () => {
  const {
    control,
    setValue,
    getValues,
    setError,
    reset,
    watch,
    formState: { errors: formErrors },
  } = useFormContext();
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        setLoading(true);
        const response: Volume[] = await getVolume();
        setVolumes(response ?? []);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setFetchError(
          `Failed to fetch volumes: ${errorMessage}. Please try again.`,
        );
        notify(`Failed to fetch volumes: ${errorMessage}`, { mode: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchVolumes();
  }, [notify]);

  const watchedVolumeId = watch("volume");

  useEffect(() => {
    if (!watchedVolumeId) {
      setIssues([]);
      setValue("issue", "");
      return;
    }

    const selectedVolume = volumes.find((v) => v.id === watchedVolumeId);
    if (selectedVolume && selectedVolume.issues) {
      setIssues(selectedVolume.issues);
      setValue("issue", selectedVolume.issues[0]?.id ?? "");
    } else {
      setIssues([]);
      setValue("issue", "");
    }
  }, [watchedVolumeId, volumes, setValue]);

  const validateAndSubmit = async () => {
    const values = getValues();
    const newErrors: { [key: string]: string } = {};

    if (!values.manuscriptLink) {
      newErrors.manuscriptLink =
        "Please upload the manuscript file before proceeding.";
    }
    if (!values.title) {
      newErrors.title = "Title is required.";
    }
    if (!values.abstract) {
      newErrors.abstract = "Abstract is required.";
    }
    if (!values.authors || values.authors.length === 0) {
      newErrors.authors = "At least one author is required.";
    }
    if (!values.volume) {
      newErrors.volume = "Volume is required.";
    }
    if (!values.issue) {
      newErrors.issue = "Issue is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        setError(field as keyof typeof values, { type: "manual", message });
      });
      return;
    }

    const publicationData = {
      title: values.title,
      abstract: values.abstract,
      authors: values.authors.split(",").map((author: string) => author.trim()),
      keywords: values.keywords || "",
      issue: values.issue,
      doi: values.doi || "",
      formattedManuscript: values.manuscriptLink,
    };

    try {
      await publishManuscript(publicationData);
      notify("Manuscript Submitted Successfully", { mode: "success" });
      reset();
      setSubmitError("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setSubmitError(
        `Failed to submit publication: ${errorMessage}. Please try again.`,
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        <p className="mb-4 italic">
          Please fill out this form to publish your manuscript.
        </p>
        <form className="space-y-6">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full p-3 border ${formErrors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter manuscript title"
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="abstract"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Abstract *
                </label>
                <textarea
                  {...field}
                  className={`w-full p-3 border ${formErrors.abstract ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows={5}
                  placeholder="Enter abstract"
                />
                {formErrors.abstract && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.abstract.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="authors"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authors (comma-separated) *
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full p-3 border ${formErrors.authors ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter authors, e.g., John Doe, Jane Smith"
                />
                {formErrors.authors && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.authors.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="keywords"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full p-3 border ${formErrors.keywords ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter keywords"
                />
                {formErrors.keywords && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.keywords.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="doi"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DOI
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full p-3 border ${formErrors.doi ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter DOI"
                />
                {formErrors.doi && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.doi.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="volume"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume *
                </label>
                <select
                  {...field}
                  className={`w-full p-3 border ${formErrors.volume ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="" disabled>
                    Select a volume
                  </option>
                  {volumes.map((volume) => (
                    <option key={volume.id} value={volume.id}>
                      {volume.name}
                    </option>
                  ))}
                </select>
                {formErrors.volume && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.volume.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="issue"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue *
                </label>
                <select
                  {...field}
                  className={`w-full p-3 border ${formErrors.issue ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={!getValues("volume") || !issues.length}
                >
                  {issues.length ? (
                    issues.map((issue) => (
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
                {formErrors.issue && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.issue.message as string}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="manuscriptLink"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manuscript File *
                </label>
                <DocumentUpload
                  fieldName="manuscriptLink"
                  label="Manuscript File"
                  onUpload={(url) => setValue("manuscriptLink", url)}
                  error={formErrors.manuscriptLink?.message as string}
                />
                {formErrors.manuscriptLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.manuscriptLink.message as string}
                  </p>
                )}
              </div>
            )}
          />
          {fetchError && (
            <p className="text-red-500 text-center">{fetchError}</p>
          )}
          {submitError && (
            <p className="text-red-500 text-center">{submitError}</p>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={validateAndSubmit}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Publication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PublishManuscript: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      manuscriptId: "",
      title: "",
      abstract: "",
      authors: "",
      keywords: "",
      volume: "",
      issue: "",
      doi: "",
      manuscriptLink: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <PublishManuscriptInner />
    </FormProvider>
  );
};

export default PublishManuscript;
