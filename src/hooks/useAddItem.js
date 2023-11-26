import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext';
import { FormContext } from '../contexts/FormContext';
import { clearAuthData } from '../functions/auth';

export const useAddItem = ({
   mutationHook,
   refetch,
   successMessage,
   errorMessage,
   commonFields,
   selectFields,
}) => {
   const [add] = mutationHook();
   const { showAlert } = useContext(AlertContext);
   const { closeForm, showForm } = useContext(FormContext);
   const navigate = useNavigate();

   const handleData = data => {
      add(data).then(response => {
         if (response.error) {
            if (
               !response.error.data ||
               response.error.data.status == 403 ||
               response.error.data.status == 500
            ) {
               clearAuthData();
               closeForm();
               navigate('/login');
               showAlert({
                  title: 'Try to login again',
               });
               return;
            }

            if (response.error.data.status == 400) {
               showAlert({
                  type: 'error',
                  title: 'Wrong input',
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
         closeForm();
      });
   };

   const onAdd = () => {
      showForm({
         commonFields,
         handleData,
         selectFields,
      });
   };

   return { onAdd };
};
