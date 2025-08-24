/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { author, baseUrl, reviewer } from "@/constants/config";
import { request } from "@/utils/request";
import { fetchData, getBearerHeader } from "../call-methods";
import { logout } from "@/app/components/log-out";

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

  const response = await request("POST", `${reviewer.createReply}`, {
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




// export const closeReview = async (reviewId: string) => {
//   const bearerHeader = await getBearerHeader();

//   const response = await request(
//     "PATCH",
//     `http://localhost:5000/api/v1/review/${reviewId}/close`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         ...bearerHeader.headers,
//       },
//     },
//   );

//   const responseBody = await response.text(); // Get raw response text
//   console.log("Response body (closeReview):", responseBody);

//   try {
//     return JSON.parse(responseBody); // Parse JSON only if it's valid
//   } catch (error) {
//     throw new Error("Invalid JSON response");
//   }
// };

// export const openReview = async (reviewId: string) => {
//   const bearerHeader = await getBearerHeader();

//   const response = await request(
//     "PATCH",
//     `${reviewer.closeOpenReview}/${reviewId}/open`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         ...bearerHeader.headers,
//       },
//     },
//   );

//   const responseBody = await response.text();
//   console.log("Response body (openReview):", responseBody);

//   try {
//     return JSON.parse(responseBody);
//   } catch (error) {
//     throw new Error("Invalid JSON response");
//   }
// };

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

// export const getReviewer = async () => {
//   const session = await getServerSession(authOptions);

//   const response = request('GET', `${SectionEditor.getAllReviewer}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${session?.token}`,
//     },
//   });

//   return response;
// };

// export const createSection = async (name: string) => {
//   const session = await getServerSession(authOptions);

//   const response = request('POST', `${api.createSection}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${session?.token}`,
//     },
//     data: { name },
//   });
//       console.log(response);

//   return response;
// };

// export const editSection = async ( id : string , name: any ) => {
//   const session = await getServerSession(authOptions);

//   return request('PATCH', `${api.editSection}/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${session?.token}`,
//     },
//     data: { name },
//   });
// };
