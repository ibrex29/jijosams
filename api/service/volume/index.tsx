"use server";

import { baseUrl } from "@/constants/config";
import { request } from "@/utils/request";

export const getVolume = async () => {
  return request("GET", `${baseUrl}/v1/volumes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
