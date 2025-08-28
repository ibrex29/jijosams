"use client";

import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Pagination } from "@mui/material";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
};

const PaginationComponent = ({ currentPage, totalPages, onPageChange, limit, onLimitChange }: PaginationProps) => {
  const handleLimitChange = (event: SelectChangeEvent<string>) => {
    onLimitChange(Number(event.target.value)); // convert string → number
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
      {/* Page size selector */}
      <FormControl size="small">
        <Select value={limit.toString()} onChange={handleLimitChange}>
          {[5, 10, 20, 50].map((size: number) => (
            <MenuItem key={size} value={size.toString()}>
              {size} / page
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        size="large"
      />
    </Box>
  );
};

export default PaginationComponent;
