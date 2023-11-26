import { useNavigate } from 'react-router-dom';

export const useSelectItem = () => {
   const navigate = useNavigate();

   const onSelectItem = (e, id) => {
      if (e.target.matches('button')) {
         return;
      }

      navigate(`${id}`);
   };

   return { onSelectItem };
};
