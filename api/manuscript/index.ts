/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/constants/config";
import { ManuscriptProps } from "@/types";
import { request } from "@/utils/request";

import { getBearerHeader } from "../call-methods";

export const getAuthorMetrics = async () => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.authorMetrics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response;
};

export const getReviewerMetrics = async () => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.reviewerMetrics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response;
};

export const submitManuscript = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${api.submitManuscript}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });
  return response;
};

export const getAuthorManuscripts = async (): Promise<ManuscriptProps[]> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.AuthorManuscripts, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response as Promise<ManuscriptProps[]>;
};

export const getAllManuscripts = async (): Promise<ManuscriptProps[]> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.AllManuscripts, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response as Promise<ManuscriptProps[]>;
};

export const getSEManuscript = async (): Promise<ManuscriptProps[]> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.SEManuscript, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response as Promise<ManuscriptProps[]>;
};

export const getREManuscript = async () => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.REManuscript, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  return response;
};

// export const submitManuscript = async (data: any) => {
//   try {

//     console.log(accessToken ? true : false);
//     const mappedData = {
//       title: data.title,
//       abstract: data.abstract,
//       keywords: data.keywords,
//       author: data.author,
//       coAuthors: data.coAuthor,
//       suggestedReviewer: data.suggestedReviewer,
//       manuscriptLink: data.manuscript,
//       proofofPayment: data.proofofPayment,
//       otherDocsLink: data.otherDocs,
//     };

//     const response = await fetch(`${baseUrl}/manuscripts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: accessToken ? `Bearer ${accessToken}` : '', // Add Authorization header if token exists
//       },
//       body: JSON.stringify(mappedData),
//     });

//     console.log(response);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Submission failed');
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Submission failed');
//   }
// };

// export const getSubmittedManuscripts = async () => {
//   try {
//     const accessToken = localStorage.getItem('custom-auth-token');

//     if (!accessToken) {
//       throw new Error('No access token found');
//     }

//     const response = await fetch(`${baseUrl}/v1/author/Submitted-Manuscript`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         accept: 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to fetch manuscripts');
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to fetch manuscripts');
//   }
// };

// export const getAssignedManuscripts = async () => {
//   try {
//     const accessToken = localStorage.getItem('custom-auth-token');

//     if (!accessToken) {
//       throw new Error('No access token found');
//     }

//     const response = await fetch(`${baseUrl}/manuscripts/assigned`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         accept: 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to fetch manuscripts');
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to fetch manuscripts');
//   }
// };

// export const getUnAssignedManuscripts = async () => {
//   try {
//     const accessToken = localStorage.getItem('custom-auth-token');

//     if (!accessToken) {
//       throw new Error('No access token found');
//     }

//     const response = await fetch(`${baseUrl}/manuscripts/unassigned`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         accept: 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to fetch manuscripts');
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to fetch manuscripts');
//   }
// };
