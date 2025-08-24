"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ContactInfoProps {
  handleNext: () => void;
}

const ContactInfoStep: React.FC<ContactInfoProps> = ({ handleNext }) => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = () => {
    handleNext();
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 3 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6">Author Information</Typography>

      <Controller
        name="author"
        control={control}
        rules={{ required: "Author is required" }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Author"
            variant="outlined"
            margin="normal"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="coAuthors"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Co-Author"
            variant="outlined"
            margin="normal"
            {...field}
          />
        )}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none", // keeps text normal instead of uppercase
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactInfoStep;
