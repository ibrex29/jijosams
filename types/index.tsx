/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export enum UserRole {
  Author = "author",
  Reviewer = "reviewer",
  ManagingEditor = "Managing-Editor",
  SectionEditor = "section-editor",
  EditorInChief = "editor-in-chief",
}

export const rolesMap: Record<string, string> = {
  [UserRole.Author]: "/dashboard/author",
  [UserRole.Reviewer]: "/dashboard/reviewer",
  [UserRole.ManagingEditor]: "/dashboard/managing-editor",
  [UserRole.SectionEditor]: "/dashboard/section-editor",
  [UserRole.EditorInChief]: "/dashboard/editor-in-chief",
};

export enum Status {
  ALL = "",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export enum Priority {
  High = "high",
  Low = "low",
  Mid = "mid",
}

export type Mode = "info" | "success" | "warning" | "error";

export type DefaultProps = {
  children: ReactNode;
};

export type ComponentProps = {
  children: React.ReactNode;
  [key: string]: any;
};

export interface ManuscriptProps {
  id: string;
  title: string;
  abstract: string;
  keywords: string;
  authorName: string;
  coAuthor: string;
  status: string;
  authorId: string;
  createdAt: string;
  createdBy: string;
  suggestedReviewer: string;
  updatedAt: string;
  updatedBy: string;
  isPublished: boolean;
  assignmentDate: string;
  reviewDueDate: string;
  reviewerId: string | null;
  sectionId: string | null;
  Document: DocumentProps[];
  Section: SectionProps | null;
}

export interface Reviewer {
  Manuscript: ManuscriptProps;
  id: string;
  userId: string;
  sectionId: string;
  expertise: string;
}

export interface DocumentProps {
  id: string;
  manuscriptLink: string;
  proofofPayment: string;
  otherDocsLink: string;
  manuscriptId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitManuscriptProps {
  title: string;
  abstract: string;
  keywords: string;
  author: string;
  coAuthors: string[];
  suggestedReviewer: string;
  manuscriptLink: string;
  proofofPayment: string;
  otherDocsLink: string;
}

export interface SectionProps {
  id: string;
  name: string;
}

export interface VolumeProps {
  id: string;
  name: string;
  description: string;
}
export interface CreateVolumeProps {
  name: string;
  description: string;
}

export interface IssueProps {
  id: string;
  name: string;
  description: string;
  volumeId: string;
}
export interface CreateIssueProps {
  name: string;
  description: string;
  volumeId: string;
}

type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export interface Reviewer {
  id: string;
  userId: string;
  expertiseArea: string;
  sectionId: string;
  user: UserType;
}

interface Reply {
  id: string;
  reviewId: string;
  authorId: string;
  subject: string;
  contents: string;
  uploadFiles: string;
  isauthor: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  manuscriptId: string;
  reviewerId: string;
  reviewDate: string;
  comments: string;
  recommendation: string;
  authorId: string;
  isClosed: boolean;
  Reply: Reply[];
}

/* Interface for Landing Pages */
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
  issues?: Issue[];
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
  pageRange?: string;
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

export interface Issue {
  id: string;
  name: string;
  createdAt: string;
  Volume?: {
    name: string;
  };
}

export interface RecentManuscript {
  id: string;
  title: string;
  Authors: string[];
  createdAt: string;
  DOI?: string;
  isActive: boolean;
  pageRange?: string
  Issue?: {
    Volume?: {
      name: string;
    };
    name: string;
  };
}
