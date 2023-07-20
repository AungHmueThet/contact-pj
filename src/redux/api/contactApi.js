import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://contact-app.mmsdev.site/api/v1",
    }),
    tagTypes: ["contact"],
    endpoints: (builder) => ({
        getContact: builder.query({
            query: (token) => ({
                url: "/contact",
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["contact"],
        }),
        createContact: builder.mutation({
            query: ({ data, token }) => ({
                url: "/contact",
                method: "POST",
                body: data,
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["contact"],
        }),
        getSingleContact: builder.query({
            query: ({ id, token }) => ({
                url: `/contact/${id}`,
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["contact"],
        }),
        deleteContact: builder.mutation({
            query: ({ id, token }) => ({
                url: `/contact/${id}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["contact"],
        }),
    }),
});
export const {
    useGetContactQuery,
    useCreateContactMutation,
    useGetSingleContactQuery,
    useDeleteContactMutation
} = contactApi;
