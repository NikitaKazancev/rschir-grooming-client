import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const salonApi = createApi({
   reducerPath: 'salonApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/salons',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllSalons: builder.query({
         query: () => '',
      }),
      findSalonById: builder.query({
         query: id => `/${id}`,
      }),
      saveSalon: builder.mutation({
         query: ({ address, name, phone }) => ({
            url: '',
            method: 'POST',
            body: { address, name, phone },
         }),
      }),
      changeSalon: builder.mutation({
         query: ({ address, name, phone }) => ({
            url: '',
            method: 'PUT',
            body: { address, name, phone },
         }),
      }),
      deleteSalonById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllSalonsQuery,
   useFindSalonByIdQuery,
   useSaveSalonMutation,
   useChangeSalonMutation,
   useDeleteSalonByIdMutation,
} = salonApi;
