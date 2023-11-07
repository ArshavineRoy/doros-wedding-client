import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../features/auth/authSlicerLogin';
import { selectCurrentrefreshToken, selectCurrentAccessToken } from '../../features/auth/authSlicerLogin';

const baseQuery = fetchBaseQuery({
    baseUrl:"https://doros-wedding-server.onrender.com/",
    credentials:"include",
    prepareHeaders:(headers, {getState}) =>{
        const accessToken = selectCurrentAccessToken(getState())
        const refreshToken = selectCurrentrefreshToken(getState())
        if(accessToken){
            headers.set("Authorization", `Bearer ${accessToken}`)
        }

        if(refreshToken){
            headers.set('refresh-token', refreshToken)
        }
        return headers
    }
});

// give user refresh token when access token has expired

const baseQueryWithReuth = async (args, api, extraOptions) => {
    // /await refetch first before giving accesstoken
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 403){
        console.log("sending refresh token")

        // generate refresh token for the user
        const refreshQuery = await baseQuery("/refresh", api, extraOptions)
        // to be deleted though
        console.log(refreshQuery)

        // update tokens if request was successful
        if(refreshQuery?.data){
            const {user, refreshToken,accessToken} = refreshQuery.data
            // give user the new accesstoken
            api.dispatch(setCredentials({user, accessToken, refreshToken}))

            // retry original query with new accesstoken
            result = await baseQuery(args,api,extraOptions)
        }else {
            api.dispatch(logout())
        }
    }

    return result

}

// create an api
export const apiSlice = createApi({
    baseQuery: baseQueryWithReuth,
    endpoints: builder => ({})
})