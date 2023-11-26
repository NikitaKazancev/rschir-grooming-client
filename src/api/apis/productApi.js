import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getJwt } from '../../functions/auth';

export const productApi = createApi({
   reducerPath: 'productApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9090/api/v1/products',
      prepareHeaders: headers => {
         headers.set('Authorization', `Bearer ${getJwt()}`);
      },
   }),
   endpoints: builder => ({
      findAllProducts: builder.query({
         query: () => '',
      }),
      findProductById: builder.query({
         query: id => `/${id}`,
      }),
      saveProduct: builder.mutation({
         query: ({ name, duration, price }) => ({
            url: '',
            method: 'POST',
            body: { name, duration, price },
         }),
      }),
      changeProduct: builder.mutation({
         query: ({ name, duration, price }) => ({
            url: '',
            method: 'PUT',
            body: { name, duration, price },
         }),
      }),
      deleteProductById: builder.mutation({
         query: id => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const {
   useFindAllProductsQuery,
   useFindProductByIdQuery,
   useSaveProductMutation,
   useChangeProductMutation,
   useDeleteProductByIdMutation,
} = productApi;
