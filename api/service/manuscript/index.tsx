"use server";

import { baseUrl } from "@/constants/config";
import { SortOrder } from "@/types/enum";
import { request } from "@/utils/request";

export const getPublishedManuscript = async (
  sortOrder: SortOrder = SortOrder.Asc,
  page: number = 1,
  limit: number = 10,
  search?: string,
  issueId?: string,
  volumeId?: string,
  isActive?: boolean,
  status?: string,
  jobTitle?: string,
) => {
  return request("GET", `${baseUrl}/v1/publication/published-manuscript`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      sortOrder,
      page,
      limit,
      search,
      issueId,
      volumeId,
      isActive,
      status,
      jobTitle,
    },
  });
};
