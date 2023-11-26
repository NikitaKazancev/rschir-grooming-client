import { useContext } from 'react';
import {
   useDeleteSalaryByIdMutation,
   useFindAllSalaryQuery,
} from '../../../api/apis/salaryApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Salaries = () => {
   const { isAdmin } = useContext(AuthContext);
   const { data, refetch } = useFind({
      queryHook: useFindAllSalaryQuery,
   });
   const { onSelectItem } = useSelectItem();

   const { onDelete } = useDeleteItem({
      mutationHook: useDeleteSalaryByIdMutation,
      refetch,
      errorMessage: 'Salary cannot be deleted',
      successMessage: 'Salary has been deleted',
   });

   const onAdd = () => {};

   return (
      <div className='list-wrapper'>
         <ul className='list'>
            {data
               ? data.data.map(({ id, month, salonId }) => (
                    <Item
                       month={month}
                       salonId={salonId}
                       id={id}
                       key={id}
                       showBtns={isAdmin}
                       onSelect={e => onSelectItem(e, id)}
                       onDelete={() => onDelete(id)}
                    />
                 ))
               : null}
         </ul>
         {isAdmin ? (
            <Btn
               text='add salary'
               styleType='success'
               className='list__add-btn'
               onClick={onAdd}
            />
         ) : null}
      </div>
   );
};

const Item = ({ month, salonId, onSelect, showBtns = true, onDelete }) => {
   const title = `${new Date(
      month
   ).toLocaleDateString()}, salon's id = ${salonId}`;

   return (
      <li className='item' onClick={onSelect}>
         <span>{title}</span>
         {showBtns ? (
            <BtnGroup
               btnsData={[
                  { text: 'delete', styleType: 'error', onClick: onDelete },
               ]}
            />
         ) : null}
      </li>
   );
};
