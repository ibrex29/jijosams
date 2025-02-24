"use server";

import { baseUrl } from "@/constants/config";
import { GetManuscriptByIdResponse, PublishedManuscriptResponse } from "@/types";
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
): Promise<PublishedManuscriptResponse> => {
  const response = request(
    "GET",
    `${baseUrl}/v1/publication/published-manuscript`,
    {
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
    },
  );
  return response as Promise<PublishedManuscriptResponse>;
};


export const getPublishedManuscriptById = async (id : string)  => {
  const response = request(
    "GET",
    `${baseUrl}/v1/publication/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },      
    },
  );
  return response as Promise<GetManuscriptByIdResponse>; ;
};

export const updateDownloadCount = async (id: string) => {
  const response = request(
    "POST",
    `${baseUrl}/v1/publication/${id}/download`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
}