"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

interface CreateReviewFormProps {
  manuscriptId: string;
  onSubmit: (data: ReviewFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ReviewFormData {
  manuscriptId: string;
  // Comments
  comments: string;
  commentsForEditors: string;
  
  // Checklist - Recommendations for Authors
  introduction: string;
  researchDesign: string;
  methods: string;
  results: string;
  conclusions: string;
  figuresAndTables: string;
  englishQuality: string;
  
  // Overall Recommendation
  recommendation: string;
  
  // Preferences
  notifyOnFinalStatus: boolean;
  aiDeclarationConfirmed: boolean;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({
  manuscriptId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    manuscriptId,
    comments: "",
    commentsForEditors: "",
    introduction: "",
    researchDesign: "",
    methods: "",
    results: "",
    conclusions: "",
    figuresAndTables: "",
    englishQuality: "",
    recommendation: "",
    notifyOnFinalStatus: false,
    aiDeclarationConfirmed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ReviewFormData, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Comments for authors
    if (!formData.comments.trim())
      newErrors.comments = "Comments for authors are required";

    // Required checklist fields
    if (!formData.introduction)
      newErrors.introduction = "This field is required";
    if (!formData.researchDesign)
      newErrors.researchDesign = "This field is required";
    if (!formData.methods)
      newErrors.methods = "This field is required";
    if (!formData.results)
      newErrors.results = "This field is required";
    if (!formData.conclusions)
      newErrors.conclusions = "This field is required";
    if (!formData.figuresAndTables)
      newErrors.figuresAndTables = "This field is required";
    if (!formData.englishQuality)
      newErrors.englishQuality = "This field is required";

    // Overall recommendation
    if (!formData.recommendation)
      newErrors.recommendation = "Overall recommendation is required";

    // AI Declaration
    if (!formData.aiDeclarationConfirmed)
      newErrors.aiDeclarationConfirmed =
        "You must confirm the AI declaration to submit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Recommendations for Authors Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recommendations for Authors{" "}
          <Typography component="span" sx={{ fontSize: "14px", color: "text.secondary" }}>
            (will be shown to authors)
          </Typography>
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Answers to the following questions do not replace any specific comments
          made for authors. Please give further details in the &ldquo;comments for authors&rdquo;
          box below.
        </Typography>

        {/* Question 1 - Introduction */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.introduction}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Does the introduction provide sufficient background and include all
            relevant references?
          </FormLabel>
          <RadioGroup
            row
            value={formData.introduction}
            onChange={(e) =>
              handleChange("introduction", e.target.value)
            }
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.introduction && (
            <Typography variant="caption" color="error">
              {errors.introduction}
            </Typography>
          )}
        </FormControl>

        {/* Question 2 */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.researchDesign}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Is the research design appropriate?
          </FormLabel>
          <RadioGroup
            row
            value={formData.researchDesign}
            onChange={(e) => handleChange("researchDesign", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.researchDesign && (
            <Typography variant="caption" color="error">
              {errors.researchDesign}
            </Typography>
          )}
        </FormControl>

        {/* Question 3 - Methods */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.methods}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Are the methods adequately described?
          </FormLabel>
          <RadioGroup
            row
            value={formData.methods}
            onChange={(e) => handleChange("methods", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.methods && (
            <Typography variant="caption" color="error">
              {errors.methods}
            </Typography>
          )}
        </FormControl>

        {/* Question 4 - Results */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.results}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Are the results clearly presented?
          </FormLabel>
          <RadioGroup
            row
            value={formData.results}
            onChange={(e) => handleChange("results", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.results && (
            <Typography variant="caption" color="error">
              {errors.results}
            </Typography>
          )}
        </FormControl>

        {/* Question 5 - Conclusions */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.conclusions}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Are the conclusions supported by the results?
          </FormLabel>
          <RadioGroup
            row
            value={formData.conclusions}
            onChange={(e) => handleChange("conclusions", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.conclusions && (
            <Typography variant="caption" color="error">
              {errors.conclusions}
            </Typography>
          )}
        </FormControl>

        {/* Question 6 */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.figuresAndTables}
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            Are all figures and tables clear and well-presented?
          </FormLabel>
          <RadioGroup
            row
            value={formData.figuresAndTables}
            onChange={(e) => handleChange("figuresAndTables", e.target.value)}
          >
            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
            <FormControlLabel
              value="CAN_BE_IMPROVED"
              control={<Radio />}
              label="Can be improved"
            />
            <FormControlLabel
              value="MUST_BE_IMPROVED"
              control={<Radio />}
              label="Must be improved"
            />
            <FormControlLabel
              value="NOT_APPLICABLE"
              control={<Radio />}
              label="Not applicable"
            />
          </RadioGroup>
          {errors.figuresAndTables && (
            <Typography variant="caption" color="error">
              {errors.figuresAndTables}
            </Typography>
          )}
        </FormControl>

        {/* English Quality */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.englishQuality}
          required
        >
          <FormLabel component="legend" sx={{ mb: 1, fontSize: "14px" }}>
            <Typography component="span" color="error">
              *
            </Typography>{" "}
            Quality of English Language
          </FormLabel>
          <RadioGroup
            value={formData.englishQuality}
            onChange={(e) => handleChange("englishQuality", e.target.value)}
          >
            <FormControlLabel
              value="NEEDS_IMPROVEMENT"
              control={<Radio />}
              label="The English could be improved to more clearly express the research."
            />
            <FormControlLabel
              value="FINE"
              control={<Radio />}
              label="The English is fine and does not require any improvement."
            />
          </RadioGroup>
          {errors.englishQuality && (
            <Typography variant="caption" color="error">
              {errors.englishQuality}
            </Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 4 }} />

        {/* Comments for Authors */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          <Typography component="span" color="error">
            *
          </Typography>{" "}
          Comments for Authors{" "}
          <Typography component="span" sx={{ fontSize: "14px", color: "text.secondary" }}>
            (will be shown to authors)
          </Typography>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Provide detailed feedback for the authors..."
          value={formData.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
          error={!!errors.comments}
          helperText={errors.comments}
          sx={{ mb: 3 }}
          required
        />

        {/* Comments for Editors */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Comments for Editors{" "}
          <Typography component="span" sx={{ fontSize: "14px", color: "text.secondary" }}>
            (will not be shown to authors)
          </Typography>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Optional confidential comments for the editorial team..."
          value={formData.commentsForEditors}
          onChange={(e) => handleChange("commentsForEditors", e.target.value)}
          sx={{ mb: 3 }}
        />

        <Divider sx={{ my: 4 }} />

        {/* Overall Recommendation */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          error={!!errors.recommendation}
          required
        >
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            <Typography component="span" color="error">
              *
            </Typography>{" "}
            Overall Recommendation
          </FormLabel>
          <RadioGroup
            value={formData.recommendation}
            onChange={(e) => handleChange("recommendation", e.target.value)}
          >
            <FormControlLabel
              value="ACCEPT"
              control={<Radio />}
              label="Accept in present form"
            />
            <FormControlLabel
              value="MINOR_REVISIONS"
              control={<Radio />}
              label="Accept after minor revision (corrections to minor methodological errors and text editing)"
            />
            <FormControlLabel
              value="MAJOR_REVISIONS"
              control={<Radio />}
              label="Reconsider after major revision (substantial revisions to text or experimental methods needed)"
            />
            <FormControlLabel
              value="REJECT"
              control={<Radio />}
              label="Reject (article has serious flaws, additional experiments needed, research not conducted correctly)"
            />
          </RadioGroup>
          {errors.recommendation && (
            <Typography variant="caption" color="error">
              {errors.recommendation}
            </Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 4 }} />

        {/* Notification Preference */}
        <FormControl
          component="fieldset"
          fullWidth
          sx={{ mb: 3 }}
          required
        >
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
            <Typography component="span" color="error">
              *
            </Typography>{" "}
            Please confirm whether you would like to be notified about the final
            status of the paper
          </FormLabel>
          <RadioGroup
            row
            value={formData.notifyOnFinalStatus ? "yes" : "no"}
            onChange={(e) =>
              handleChange("notifyOnFinalStatus", e.target.value === "yes")
            }
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          To ensure your anonymity throughout the peer-review process, please do
          not include any identifiable information in your review report, including
          in the comments and metadata of any files that you upload.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Comments for authors may be made available to other reviewers, but your
          identity will remain anonymous.
        </Typography>

        {/* AI Declaration */}
        <FormControl
          error={!!errors.aiDeclarationConfirmed}
          required
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.aiDeclarationConfirmed}
                onChange={(e) =>
                  handleChange("aiDeclarationConfirmed", e.target.checked)
                }
              />
            }
            label={
              <Typography variant="body2">
                <Typography component="span" color="error">
                  *
                </Typography>{" "}
                I confirm that I did not use any generative AI or AI-assisted
                technological methods to prepare this reviewer report. The review
                report was prepared by myself from my own evaluation and writing.
              </Typography>
            }
          />
          {errors.aiDeclarationConfirmed && (
            <Typography variant="caption" color="error">
              {errors.aiDeclarationConfirmed}
            </Typography>
          )}
        </FormControl>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={16} />}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateReviewForm;
