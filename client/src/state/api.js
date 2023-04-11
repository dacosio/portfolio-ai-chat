/* eslint-disable no-labels */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiClient = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: [],
  endpoints: (builder) => ({
    postAiText: builder.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { usePostAiTextMutation } = apiClient;
