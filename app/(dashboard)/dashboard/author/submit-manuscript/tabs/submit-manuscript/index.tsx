/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { submitManuscript } from "@/api/manuscript";
import { SubmitManuscriptProps } from "@/types";

import ContactInfoStep from "../../components/contact-info";
import FileUploadStep from "../../components/files-upload";
import ManuscriptInfoStep from "../../components/manuscript-info";
import Loader from "@/app/components/@dashboard/components/loader";
import useNotification from "@/hooks/useNotification";

const steps = ["Contact Information", "File Uploads", "Manuscript Information"];

const MultiStepForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<SubmitManuscriptProps>();
  const [activeStep, setActiveStep] = useState(0);
  const { notify } = useNotification();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const { mutateAsync: submitManuscriptMutation } = useMutation({
    mutationFn: submitManuscript,
    onSuccess: () => {
      notify("Manuscript Submitted Successfully", { mode: "success" });
    },
    onError: (error: unknown) => {
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      notify(`Failed to submit manuscripts: ${errorMessage}`, {
        mode: "error",
      });
    },
  });

  const handleSubmit = async (data: SubmitManuscriptProps) => {
    setLoading(true);
    try {
      await submitManuscriptMutation(data);
      methods.reset();
      setActiveStep(0);
    } catch (error) {}
    setLoading(false);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <ContactInfoStep handleNext={handleNext} />;
      case 1:
        return (
          <FileUploadStep handleSubmit={handleNext} handleBack={handleBack} />
        );
      case 2:
        return (
          <ManuscriptInfoStep
            handleSubmit={methods.handleSubmit(handleSubmit)}
            handleBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <FormProvider {...methods}>
        <Box sx={{ width: "100%", mt: 8 }}>
          {" "}
          {/* Added margin-top (mt) */}
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your submission is complete!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Thank you for submitting your manuscript. We have received your
                information and will get back to you soon.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(0)}
              >
                Submit Another Manuscript
              </Button>
            </Box>
          ) : (
            <Box>{getStepContent(activeStep)}</Box>
          )}
        </Box>
      </FormProvider>
    </>
  );
};

export default MultiStepForm;
