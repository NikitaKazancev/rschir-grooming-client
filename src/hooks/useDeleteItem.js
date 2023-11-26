import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext';
import { clearAuthData } from '../functions/auth';

export const useDeleteItem = ({
   mutationHook,
   refetch,
   successMessage,
   errorMessage,
}) => {
   const [add] = mutationHook();
   const { showAlert } = useContext(AlertContext);
   const navigate = useNavigate();

   const onDelete = data => {
      add(data).then(response => {
         if (response.error) {
            if (
               !response.error.data ||
               response.error.data.status == 403 ||
               response.error.data.status == 500
            ) {
               clearAuthData();
               navigate('/login');
               showAlert({
                  title: 'Try to login again',
               });
               return;
            }

            showAlert({
               type: 'error',
               title: errorMessage,
            });
            return;
         }

         showAlert({
            type: 'success',
            title: successMessage,
         });
         refetch();
      });
   };

   return { onDelete };
};
