import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const salaryApi = createApi({
   reducerPath: 'salaryApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/salary',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllSalary: builder.query({
         query: () => '',
      }),
      findSalaryById: builder.query({
         query: id => `/${id}`,
      }),
      saveSalary: builder.mutation({
         query: ({ salonId, employees }) => ({
            url: '',
            method: 'POST',
            body: { salonId, employees },
         }),
      }),
      deleteSalaryById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllSalaryQuery,
   useFindSalaryByIdQuery,
   useSaveSalaryMutation,
   useDeleteSalaryByIdMutation,
} = salaryApi;
