import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const positionApi = createApi({
   reducerPath: 'positionApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/positions',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllPositions: builder.query({
         query: () => '',
      }),
      findPositionById: builder.query({
         query: id => `/${id}`,
      }),
      savePosition: builder.mutation({
         query: ({ name }) => ({
            url: '',
            method: 'POST',
            body: { name },
         }),
      }),
      deletePositionById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllPositionsQuery,
   useFindPositionByIdQuery,
   useSavePositionMutation,
   useDeletePositionByIdMutation,
} = positionApi;
