import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertContext';
import { clearAuthData } from '../functions/auth';

export const useChangeItem = ({
   mutationHook,
   refetch,
   initialData,
   id,
   successMessage,
   initialChanging,
   keyTypes = undefined,
}) => {
   const [isChanging, setIsChanging] = useState(initialChanging);
   const [change] = mutationHook();
   const { showAlert } = useContext(AlertContext);
   const navigate = useNavigate();

   const onChange = e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const changedData = {};
      Object.keys(initialData.data).map(key => {
         changedData[key] = formData.get(key);
      });

      if (keyTypes) {
         Object.entries(changedData).forEach(([key, value]) => {
            if (keyTypes[key] == 'number') {
               changedData[key] = parseInt(value);
            }
         });
      }

      console.log(changedData);

      change(changedData).then(response => {
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
               title: 'Wrong input',
            });
            return;
         }

         setIsChanging(false);
         showAlert({
            type: 'success',
            title: successMessage,
         });
         refetch(id);
      });
   };

   return {
      onChange,
      isChanging,
      setIsChanging,
   };
};
