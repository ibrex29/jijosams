/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { baseUrl } from "@/constants/config";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon, Upload as UploadIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface DocumentUploadProps {
  fieldName: string;
  label: string;
  accept?: string;
  onUpload: (url: string) => void;
  error?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  fieldName,
  label,
  accept = ".doc,.docx,.pdf,.txt,.odt,.rtf,.jpg,.jpeg,.png",
  onUpload,
  error,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9_.-]/g, "_");
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const uniqueId = uuidv4();
    const sanitizedFileName = sanitizeFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${baseUrl}/v1/upload`, {
        
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

        const result = await response.json();
      const fileUrl = result.fileUrl; 
      onUpload(fileUrl);
      console.log(`File uploaded successfully: ${fileUrl}`);
      setUploadedFileName(sanitizedFileName);
    } catch (error) {
      onUpload("");
      setUploadedFileName("");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileUpload(files);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {label}
      </Typography>
      <Box
        sx={{
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          width: "100%",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
        component="label"
        aria-label={`Upload ${label}`}
        htmlFor={`${fieldName}-file-input`}
      >
        <input
          id={`${fieldName}-file-input`}
          type="file"
          hidden
          accept={accept}
          onChange={handleFileChange}
          aria-describedby={`${fieldName}-upload-status`}
        />
        {uploading ? (
          <Stack direction={isSmallScreen ? "column" : "row"} alignItems="center" spacing={2}>
            <CircularProgress size={24} />
            <Typography variant="body2">Uploading...</Typography>
          </Stack>
        ) : uploadedFileName ? (
          <Stack direction={isSmallScreen ? "column" : "row"} alignItems="center" spacing={2}>
            <CheckCircleIcon size={48} color="success" />
            <Typography variant="subtitle2">{uploadedFileName}</Typography>
          </Stack>
        ) : (
          <>
            <UploadIcon size={48} />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Upload {label}
            </Typography>
          </>
        )}
        {error && (
          <Typography
            id={`${fieldName}-upload-status`}
            variant="body2"
            color="error"
            sx={{ mt: 1 }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DocumentUpload;