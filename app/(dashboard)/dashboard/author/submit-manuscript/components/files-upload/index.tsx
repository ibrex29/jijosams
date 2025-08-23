"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SubmitManuscriptProps } from "@/types";

const DocumentUpload = dynamic(
  () => import("@/app/components/document-upload"),
  { ssr: false }
);

interface FileUploadStepProps {
  handleSubmit: () => void;
  handleBack: () => void;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({
  handleSubmit,
  handleBack,
}) => {
  const { control, setValue, getValues, setError } =
    useFormContext<SubmitManuscriptProps>();

  const validateAndSubmit = () => {
    const values = getValues();
    const newErrors: { [key: string]: string } = {};

    if (!values.manuscriptLink) {
      newErrors.manuscriptLink =
        "Please upload the manuscript file before proceeding.";
      setError("manuscriptLink", {
        type: "manual",
        message: newErrors.manuscriptLink,
      });
    }
    if (!values.proofofPayment) {
      newErrors.proofofPayment =
        "Please upload proof of payment before proceeding.";
      setError("proofofPayment", {
        type: "manual",
        message: newErrors.proofofPayment,
      });
    }

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    handleSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Manuscript upload */}
      <Controller
        name="manuscriptLink"
        control={control}
        render={({ fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manuscript File (PDF/DOCX) *
            </label>
            <DocumentUpload
              fieldName="manuscriptLink"
              label="Manuscript File"
              accept=".pdf,.docx"
              onUpload={(url) =>
                setValue("manuscriptLink", url, { shouldValidate: true })
              }
              error={error?.message}
            />
          </div>
        )}
      />

      {/* Proof of Payment upload */}
      <Controller
        name="proofofPayment"
        control={control}
        render={({ fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proof of Payment (Image/PDF) *
            </label>
            <DocumentUpload
              fieldName="proofofPayment"
              label="Proof of Payment"
              accept=".pdf,.jpg,.jpeg,.png"
              onUpload={(url) =>
                setValue("proofofPayment", url, { shouldValidate: true })
              }
              error={error?.message}
            />
          </div>
        )}
      />

      {/* Additional documents */}
      <Controller
        name="otherDocsLink"
        control={control}
        render={({ fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Documents (PDF/DOCX)
            </label>
            <DocumentUpload
              fieldName="otherDocsLink"
              label="Additional Documents"
              accept=".pdf,.docx"
              onUpload={(url) =>
                setValue("otherDocsLink", url, { shouldValidate: true })
              }
              error={error?.message}
            />
          </div>
        )}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={validateAndSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileUploadStep;
