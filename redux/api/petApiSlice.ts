import { PET_URL } from "@/constants/Urls";
import { apiSlice } from "./apiSlice";

export const petApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPetsUploadedByUser: builder.query({
      query: (userId) => ({
        url: `${PET_URL}/user/${userId}`,
      }),
    }),
  }),
});

export const { useLazyGetPetsUploadedByUserQuery } = petApiSlice;
