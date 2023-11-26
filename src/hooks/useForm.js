import { useState } from 'react';

export const useForm = () => {
   const [formData, setFormData] = useState({
      commonFields: [{ name: '', label: '' }],
      selectFields: [],
      handleData: () => {},
      isShown: false,
   });

   const showForm = ({
      commonFields = [{ name: '', label: '', type: 'text' }],
      selectFields = [],
      handleData = () => {},
   }) => {
      setFormData({ commonFields, selectFields, handleData, isShown: true });
   };

   const closeForm = () => {
      setFormData({ ...formData, isShown: false });
   };

   return { formData, showForm, closeForm };
};
