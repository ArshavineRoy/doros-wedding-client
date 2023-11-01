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

    })
})

export const {
    useLoginMutation, useSignupMutation
} = authMutations