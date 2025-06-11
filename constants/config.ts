/**
 * Api detail
 */

export const baseUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "http://localhost:5000/api";

export const authUrl = `${baseUrl}/v1/auth`;

export const api = {
  submitManuscript: `${baseUrl}/manuscripts`,
  AuthorManuscripts: `${baseUrl}/v1/author/submitted-manuscripts`,
  AllManuscripts: `${baseUrl}/manuscripts/submitted`,
  SEManuscript: `${baseUrl}/manuscripts/section-editor`,
  REManuscript: `${baseUrl}/v1/review/assigned-manuscript`,
  getSection: `${baseUrl}/v1/section/all`,
  createSection: `${baseUrl}/v1/section/create`,
  editSection: `${baseUrl}/v1/section`,
  assignManuscriptSection: `${baseUrl}/manuscripts/assign-section`,
  authorMetrics: `${baseUrl}/v1/author/status-counts`,
  reviewerMetrics: `${baseUrl}/v1/analytics/reviewer/manuscripts-count`,
};

export const SectionEditor = {
  getAllReviewer: `${baseUrl}/manuscripts/reviewers-for-section-editor`,
  assignManuscriptReviewer: `${baseUrl}/manuscripts/assign-reviewer`,
};

export const reviewer = {
  getRecommendation: `${baseUrl}/v1/review/recommendations`,
  createReview: `${baseUrl}/v1/review/create-review`,
  getReplies: `${baseUrl}/v1/reply/manuscript`,
  acceptManuscriptUrl: `${baseUrl}/v1/review/review`,
  createReply: `${baseUrl}/v1/reply/reviewer-reply`,
  closeOpenReview: `${baseUrl}/v1/review`,
};

export const author = {
  createReply: `${baseUrl}/v1/reply/author-reply`,
};

export const User = {
  createUser: `${baseUrl}/user`,
  createAuthor: `${baseUrl}/v1/author/author`,
};

export const volume = {
  Volume: `${baseUrl}/v1/volumes`,
  Issue: `${baseUrl}/v1/issues`,
};
