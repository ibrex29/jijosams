export interface Issue {
  id: string;
  name: string;
  description: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  volumeId: string;
}

export interface Volume {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  issues: Issue[];
}

export interface Manuscript {
  id: string;
  title: string;
  abstract: string;
  keywords: string;
  Authors: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isPublished: boolean;
  DOI: string;
  formattedManuscript: string;
  downloadTimes: number;
  manuscriptId: string;
  issueId: string;
  reactions: {
    LIKE: number;
  };
  issue: {
    name: string;
    volume: {
      name: string;
    };
  };
}

export interface Meta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PublishedManuscriptResponse {
  data: Manuscript[];
  meta: Meta;
}

export interface GetManuscriptByIdResponse extends Manuscript {
  userId: string | null;
  createdByUserId: string | null;
  updatedByUserId: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[]; // Define a more specific type if needed
}