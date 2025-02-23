// "use server";

// import { Method, request } from "@/utils/request";
// import { getServerSession } from "next-auth";

// export const getBearerHeader = async () => {
//   const session = await getServerSession(authOptions);
//   return {
//     headers: {
//       // 'Content-Type': 'application/json',
//       Authorization: `Bearer ${session?.token}`,
//     },
//   };
// };

// export const fetchData = async (endpoint: string): Promise<any[]> => {
//   try {
//     const res = await fetch(endpoint, await getBearerHeader());
//     return res.json();
//   } catch (err) {
//     return [];
//   }
// };

// export const postData = async (
//   method: Method,
//   endpoint: string,
//   payload: any,
// ) => {
//   const res = await request(method, endpoint, {
//     ...(await getBearerHeader()).headers,
//     data: payload,
//   });

//   return res;
// };
