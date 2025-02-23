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
