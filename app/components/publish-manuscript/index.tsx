/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { getVolume } from "@/app/api/(landing-page)/volume";
import { publishManuscript } from "@/app/api/manuscript";
import { Box, Typography, CircularProgress, TextField, InputLabel, Select, MenuItem, Stack, Button, FormControl } from "@mui/material";
import useNotification from "@/hooks/useNotification";
import { Volume, Issue } from "@/types";

const DocumentUpload = dynamic(() => import("@/app/components/document-upload"), { ssr: false });

const PublishManuscriptInner: React.FC = () => {
  const { control, setValue, getValues, setError, reset, watch, formState: { errors: formErrors } } = useFormContext();
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
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setFetchError(`Failed to fetch volumes: ${errorMessage}. Please try again.`);
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
      newErrors.manuscriptLink = "Please upload the manuscript file before proceeding.";
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
      reset(); // Reset form to default values
      setSubmitError("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setSubmitError(`Failed to submit publication: ${errorMessage}. Please try again.`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ m: 10, width: "90%" }} key="publish-form">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!formErrors.title}
            helperText={(formErrors.title?.message as string) || ""}
            required
          />
        )}
      />
      <Controller
        name="abstract"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Abstract"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!formErrors.abstract}
            helperText={(formErrors.abstract?.message as string) || ""}
            required
          />
        )}
      />
      <Controller
        name="authors"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Authors (comma-separated)"
            fullWidth
            margin="normal"
            error={!!formErrors.authors}
            helperText={(formErrors.authors?.message as string) || "Enter authors separated by commas"}
            required
          />
        )}
      />
      <Controller
        name="keywords"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Keywords"
            fullWidth
            margin="normal"
            error={!!formErrors.keywords}
            helperText={(formErrors.keywords?.message as string) || ""}
          />
        )}
      />
      <Controller
        name="doi"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="DOI"
            fullWidth
            margin="normal"
            error={!!formErrors.doi}
            helperText={(formErrors.doi?.message as string) || ""}
          />
        )}
      />
      <Controller
        name="volume"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!formErrors.volume}>
            <InputLabel>Volume</InputLabel>
            <Select {...field} label="Volume" required>
              {volumes.map((volume) => (
                <MenuItem key={volume.id} value={volume.id}>
                  {volume.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.volume && (
              <Typography variant="body2" color="error">
                {(formErrors.volume.message as string) || ""}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="issue"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!formErrors.issue}>
            <InputLabel>Issue</InputLabel>
            <Select {...field} label="Issue" required disabled={!getValues("volume") || !issues.length}>
              {issues.length ? (
                issues.map((issue) => (
                  <MenuItem key={issue.id} value={issue.id}>
                    {issue.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No issues available
                </MenuItem>
              )}
            </Select>
            {formErrors.issue && (
              <Typography variant="body2" color="error">
                {(formErrors.issue.message as string) || ""}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="manuscriptLink"
        control={control}
        render={({ field }) => (
          <DocumentUpload
            fieldName="manuscriptLink"
            label="Manuscript File"
            onUpload={(url) => setValue("manuscriptLink", url)}
            error={formErrors.manuscriptLink?.message as string}
          />
        )}
      />
      {fetchError && (
        <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
          {fetchError}
        </Typography>
      )}
      {submitError && (
        <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
          {submitError}
        </Typography>
      )}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
        <Button type="button" onClick={validateAndSubmit} variant="contained">
          Submit Publication
        </Button>
      </Stack>
    </Box>
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