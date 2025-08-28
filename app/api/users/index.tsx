/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getServerSession } from "next-auth";

import { User } from "@/constants/config";
import { request } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";

export const createUser = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${User.createUser}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const createAuthor = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${User.createAuthor}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getPaginatedUsers = async (params: {
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
  sortField?: "firstName" | "lastName" | "email" | "createdAt";
  roleId?: string;
  sectionId?: string;
}) => {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams({
    sortOrder: params.sortOrder ?? "asc",
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10),
    search: params.search ?? "",
    sortField: params.sortField ?? "createdAt",
    ...(params.roleId ? { roleId: params.roleId } : {}),
    ...(params.sectionId ? { sectionId: params.sectionId } : {}),
  }).toString();

  const response = request("GET", `${User.getPaginatedUsers}?${query}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response;
};

type UpdateUserPayload = {
  roleId: string;
  sectionId?: string;
  replaceRoles?: boolean;
};

export const updateUserRoleOrSection = async (userId: string, data: UpdateUserPayload) => {
  const session = await getServerSession(authOptions);

  const response = request("PATCH", `${User.updateRoleOrSection}/${userId}/role-or-section`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};