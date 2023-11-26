import { createContext } from 'react';

export const FormContext = createContext({
   showForm: ({
      commonFields = [{ name: '', label: '' }],
      selectFields = [],
      handleData = () => {},
   }) => {},
   closeForm: () => {},
});
