import { PET_URL } from "@/constants/Urls";
import { apiSlice } from "./apiSlice";

export const petApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    petProfile: builder.query({
      query: (petId) => ({
        url: `${PET_URL}/${petId}`,
        method: "GET",
      }),
    }),
    addPet: builder.mutation({
      query: (data) => ({
        url: `${PET_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getPets: builder.query({
      query: () => ({
        url: PET_URL,
      }),
      providesTags: ["Pet"],
      keepUnusedDataFor: 5,
    }),
    updatePetDetails: builder.mutation({
      query: (data) => ({
        url: `${PET_URL}/${data.petId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deletePet: builder.mutation({
      query: (petId) => ({
        url: `${PET_URL}/${petId}`,
        method: "DELETE",
      }),
    }),
    transerPetOwnershipWithAdoption: builder.mutation({
      query: (data) => ({
        url: `${PET_URL}/${data.petId}/adopt`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pet"],
    }),
    updatePetFosteringHistory: builder.mutation({
      query: (data) => ({
        url: `${PET_URL}/${data.petId}/foster`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pet"],
    }),
    requestForPetAdoptionOrFostering: builder.mutation({
      query: (data) => ({
        url: `${PET_URL}/${data.petId}/request`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  usePetProfileQuery,
  useDeletePetMutation,
  useAddPetMutation,
  useGetPetsQuery,
  useLazyGetPetsQuery,
  useLazyPetProfileQuery,
  useRequestForPetAdoptionOrFosteringMutation,
  useUpdatePetFosteringHistoryMutation,
  useTranserPetOwnershipWithAdoptionMutation,
} = petApiSlice;
