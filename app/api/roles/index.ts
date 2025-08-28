/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api } from "@/constants/config";
import { fetchData } from "../call-methods";

export const getRoles = async () => fetchData(`${api.getRoles}/roles`); 

