import { ManuscriptProps } from "@/types";

export interface FetchManuscriptsParams {
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}


export interface FetchManuscriptsResponse {
  data: ManuscriptProps[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}