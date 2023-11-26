import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9090/auth/' }),
   endpoints: builder => ({
      login: builder.mutation({
         query: ({ email, password }) => ({
            url: 'login',
            method: 'POST',
            body: { email, password },
         }),
      }),
      register: builder.mutation({
         query: ({ email, password, firstname, lastname }) => ({
            url: 'register',
            method: 'POST',
            body: { email, password, firstname, lastname },
         }),
      }),
      findProfileData: builder.query({
         query: () => `/users?jwt=${getJwt()}`,
      }),
   }),
});

export const {
   useLoginMutation,
   useRegisterMutation,
   useFindProfileDataQuery,
} = authApi;
