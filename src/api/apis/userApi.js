import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/users',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllUsers: builder.query({
         query: () => '',
      }),
      findUserById: builder.query({
         query: id => `/${id}`,
      }),
      saveUser: builder.mutation({
         query: ({
            firstname,
            lastname,
            email,
            password,
            phone,
            birthday,
            dogBreed,
            role,
         }) => ({
            url: '',
            method: 'POST',
            body: {
               firstname,
               lastname,
               email,
               password,
               phone,
               birthday,
               dogBreed,
               role,
            },
         }),
      }),
      changeUser: builder.mutation({
         query: ({ firstname, lastname, phone, birthday, dogBreed }) => ({
            url: '',
            method: 'PUT',
            body: {
               firstname,
               lastname,
               phone,
               birthday,
               dogBreed,
            },
         }),
      }),
      deleteUserById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllUsersQuery,
   useFindUserByIdQuery,
   useSaveUserMutation,
   useChangeUserMutation,
   useDeleteUserByIdMutation,
} = userApi;
