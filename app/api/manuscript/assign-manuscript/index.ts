/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api, SectionEditor } from "@/constants/config";
import { request } from "@/utils/request";

import { getBearerHeader } from "../../call-methods";

export interface AssignManuscriptReviewerPayload {
  manuscriptId: string;
  reviewerIds: string[];
  reviewDueDate: string;
}

export const assignManuscriptSection = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("PATCH", `${api.assignManuscriptSection}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });
  return response;
};



export const assignManuscriptReviewer = async (payload: AssignManuscriptReviewerPayload) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "POST",
    `${SectionEditor.assignManuscriptReviewer}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      data: payload,
    },
  );
  return response;
};
