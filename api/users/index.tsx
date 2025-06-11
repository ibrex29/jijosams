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
