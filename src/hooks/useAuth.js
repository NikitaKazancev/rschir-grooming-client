import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../components/contexts/AlertContext';
import { setAuthData } from '../functions/auth';

export const useAuth = (queryHook, queryHookParams = undefined) => {
   const navigate = useNavigate();
   const { showAlert } = useContext(AlertContext);
   const { data, isFetching, refetch } = queryHook(queryHookParams);

   useEffect(() => {
      if (isFetching) {
         return;
      }

      if (!data || data.status == 403) {
         navigate('/login');
         showAlert({
            title: 'You are not authorized',
            type: 'error',
         });
         setAuthData({ jwt: '', role: '' });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isFetching]);

   return {
      data,
      refetch,
   };
};
