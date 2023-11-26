import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/authApi';
import { salonApi } from './apis/salonApi';
import { productApi } from './apis/productApi';
import { positionApi } from './apis/positionApi';
import { employeeApi } from './apis/employeeApi';
import { registrationApi } from './apis/registrationApi';
import { salaryApi } from './apis/salaryApi';
import { userApi } from './apis/userApi';

export const store = configureStore({
   reducer: {
      authApi: authApi.reducer,
      salonApi: salonApi.reducer,
      productApi: productApi.reducer,
      positionApi: positionApi.reducer,
      employeeApi: employeeApi.reducer,
      registrationApi: registrationApi.reducer,
      salaryApi: salaryApi.reducer,
      userApi: userApi.reducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
         .concat(authApi.middleware)
         .concat(salonApi.middleware)
         .concat(productApi.middleware)
         .concat(positionApi.middleware)
         .concat(employeeApi.middleware)
         .concat(registrationApi.middleware)
         .concat(salaryApi.middleware)
         .concat(userApi.middleware),
});
