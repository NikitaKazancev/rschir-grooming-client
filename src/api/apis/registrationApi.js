import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const registrationApi = createApi({
   reducerPath: 'registrationApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/registrations',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllRegistrations: builder.query({
         query: () => '',
      }),
      findRegistrationById: builder.query({
         query: id => `/${id}`,
      }),
      saveRegistration: builder.mutation({
         query: ({ date, productId, employeeId, comment }) => ({
            url: '',
            method: 'POST',
            body: {
               date,
               employeeId,
               productId,
               comment,
            },
         }),
      }),
      deleteRegistrationById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllRegistrationsQuery,
   useFindRegistrationByIdQuery,
   useSaveRegistrationMutation,
   useDeleteRegistrationByIdMutation,
} = registrationApi;
