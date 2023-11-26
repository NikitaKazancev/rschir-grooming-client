import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext';
import { clearAuthData, setAuthData } from '../functions/auth';
import { FormContext } from '../contexts/FormContext';

export const useFind = ({ queryHook, queryHookParams = undefined }) => {
   const navigate = useNavigate();
   const { showAlert } = useContext(AlertContext);
   const { closeForm } = useContext(FormContext);
   const { data, isFetching, refetch } = queryHook(queryHookParams);

   const returnToLogin = () => {
      navigate('/login');
      showAlert({
         title: 'You are not authorized',
         type: 'error',
      });
      closeForm();
      clearAuthData();
   };

   const badData = data => !data || data.status == 403;

   useEffect(() => {
      if (isFetching) {
         return;
      }

      if (badData(data)) {
         returnToLogin();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isFetching]);

   const refetchRes = params => {
      return refetch(params).then(data => {
         if (badData(data)) {
            returnToLogin();
            return null;
         }

         return data;
      });
   };

   return {
      data,
      refetch,
   };
};
