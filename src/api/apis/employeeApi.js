import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const employeeApi = createApi({
   reducerPath: 'employeeApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/employees',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllEmployees: builder.query({
         query: () => '',
      }),
      findEmployeeById: builder.query({
         query: id => `/${id}`,
      }),
      saveEmployee: builder.mutation({
         query: ({ address, name, phone, positionId, salonId }) => ({
            url: '',
            method: 'POST',
            body: { address, name, phone, positionId, salonId },
         }),
      }),
      changeEmployee: builder.mutation({
         query: ({ address, name, phone, position, salon }) => ({
            url: '',
            method: 'PUT',
            body: {
               address,
               name,
               phone,
               positionId: position,
               salonId: salon,
            },
         }),
      }),
      deleteEmployeeById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllEmployeesQuery,
   useFindEmployeeByIdQuery,
   useSaveEmployeeMutation,
   useChangeEmployeeMutation,
   useDeleteEmployeeByIdMutation,
} = employeeApi;
