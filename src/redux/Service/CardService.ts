import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userProfileService = createApi({
    reducerPath: "userProfileService",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    endpoints: (builder) => ({
        postData: builder.query({
            query: ({ limit, page }: any) => ({
                url: `/posts?_page=${page}&_limit=${limit}`, // Replace 'data' with your endpoint
                method: "GET",
            }),
        }),
        DeletePostData: builder.mutation({
            query: (id: string) => ({
                url: `/posts/${id}`, // Replace 'data' with your endpoint
                method: "DELETE",
            }),
        }),
    }),
});
export const { usePostDataQuery, useDeletePostDataMutation } = userProfileService;