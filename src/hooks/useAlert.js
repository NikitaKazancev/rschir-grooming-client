import { useState } from 'react';

export const useAlert = () => {
   const [alertData, setAlertData] = useState({
      isShown: false,
      title: '',
      type: 'info',
   });

   const showAlert = ({ type = 'info', title }) => {
      setAlertData({
         isShown: true,
         title,
         type,
      });

      setTimeout(() => {
         setAlertData({
            isShown: false,
            title,
            type,
         });
      }, 4000);
   };

   return {
      showAlert,
      alertData,
   };
};
