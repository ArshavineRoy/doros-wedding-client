// create a mutations from the api

import { apiSlice } from "../../app/api/apiSlice";

export const authMutations = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login:builder.mutation({
            query:credentials => ({
                url: '/login',
                method:'POST',
                body:{...credentials}
            })
        }),
        signup:builder.mutation({
            query:(userData) => ({
                url: '/register',
                method:'POST',
                body:userData
            })
        }),
        event:builder.mutation({
            query:(eventData) => ({
                url: '/events',
                method:'POST',
                body:eventData
            })
        }),

    })
})

export const {
    useLoginMutation, useSignupMutation, useEventMutation
} = authMutations