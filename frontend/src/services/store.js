// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://store-iota-dun.vercel.app/";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-iota-dun.vercel.app/",
    credentials: "include", // Include cookies with cross-origin requests
  }),
  endpoints: (builder) => ({
    getApiSession: builder.query({
      query: () => ({
        url: `/api/session`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    getStoreByLoc: builder.query({
      query: ({ store, skip }) => `/v1/search?loc=${store}&skip=${skip}`,
    }),
    getStatus: builder.query({
      query: () => "/v1/status",
    }),
    getSearcgItems: builder.query({
      query: ({ search, filterByPm, filterByCritical }) => {
        let queryString = `/v1/item?search=${search}`;
        if (filterByPm) {
          return (queryString = `/v1/item?pmScheduled=${filterByPm}`);
        }
        if (filterByPm) {
          return (filterByCritical = `/v1/item?critical=${filterByCritical}`);
        }
        return queryString;
      },
    }),
    createNewItem: builder.mutation({
      query: (newItem) => ({
        url: "v1/create",
        method: "POST",
        body: newItem,
      }),
    }),
    updateItem: builder.mutation({
      query: (body) => ({
        url: "v1/update",
        method: "PATCH",
        body: body,
      }),
    }),
    deleteItem: builder.mutation({
      query: (body) => ({
        url: "v1/delete",
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetStoreByLocQuery,
  useGetStatusQuery,
  useGetSearcgItemsQuery,
  useCreateNewItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetApiSessionQuery,
  useLogoutMutation,
} = storeApi;
