/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { author, baseUrl, reviewer } from "@/constants/config";
import { request } from "@/utils/request";
import { fetchData, getBearerHeader } from "../call-methods";
import { logout } from "@/app/components/log-out";

interface MakeRecommendationPayload {
  recommendation: "ACCEPT" | "MINOR_REVISIONS" | "MAJOR_REVISIONS" | "REJECT";
  remark?: string; // Optional remark field
}

export const closeReview = async (reviewId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/review/${reviewId}/close`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      responseType: "json",
    },
  );

  if (response && response.status === 401) {
    logout();
  }

  // Maintain original response format
  if (response && response.status && response.status >= 400) {
    return { success: false, message: response.error || "Request failed" };
  }

  return { success: true, data: response };
};

export const openReview = async (reviewId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "PATCH",
    `${baseUrl}/v1/review/${reviewId}/open`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      responseType: "json",
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }

  // Maintain original response format
  if (response && response.status && response.status >= 400) {
    return { success: false, message: response.error || "Request failed" };
  }

  return { success: true, data: response };
};

export const getRecommendation = async () => {
  const response = await fetchData(reviewer.getRecommendation);

  return response;
};

export const getReviewStatus = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "GET",
    `${baseUrl}/v1/review/${manuscriptId}/has-review`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const createReview = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${reviewer.createReview}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const createReviewerReply = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${reviewer.createReplyReviewer}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const createAuthorReply = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${author.createReply}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const getRepliesAuthor = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "GET",
    `${reviewer.getRepliesAuthor}/manuscript-author/${manuscriptId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const getReplies = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "GET",
    `${reviewer.getReplies}/${manuscriptId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const acceptManuscript = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${reviewer.acceptManuscriptUrl}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  return response;
};


export const makeRecommendationReviewer = async (
  manuscriptId: string,
  payload: MakeRecommendationPayload
) => {
  try {
    const bearerHeader = await getBearerHeader();

    const response = await request(
      "POST",
      `${baseUrl}/v1/reviewer/manuscripts/${manuscriptId}/accept`, 
      {
        headers: {
          "Content-Type": "application/json",
          ...bearerHeader.headers,
        },
        data: payload,
      }
    );

    return response;
  } catch (error: any) {
    console.error(`Failed to accept manuscript ${manuscriptId}:`, error);
    throw new Error(`Failed to accept manuscript: ${error.message}`);
  }
};
