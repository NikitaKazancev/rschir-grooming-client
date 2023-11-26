import { useContext } from 'react';
import {
   useDeleteEmployeeByIdMutation,
   useFindAllEmployeesQuery,
   useSaveEmployeeMutation,
} from '../../../api/apis/employeeApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAddItem } from '../../../hooks/useAddItem';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Employees = () => {
   const { data, refetch } = useFind({ queryHook: useFindAllEmployeesQuery });
   const { onSelectItem } = useSelectItem();
   const { isAdmin } = useContext(AuthContext);

   const commonFields = [
      { label: 'name', name: 'name' },
      { label: 'phone', name: 'phone' },
      { label: 'address', name: 'address' },
      { label: 'positionId', name: 'positionId' },
      { label: 'salonId', name: 'salonId' },
   ];

   const { onAdd } = useAddItem({
      commonFields,
      mutationHook: useSaveEmployeeMutation,
      refetch,
      errorMessage:
         'Employee with such name already exists or position or salon not found',
      successMessage: 'Employee has been created',
   });

   const { onDelete } = useDeleteItem({
      mutationHook: useDeleteEmployeeByIdMutation,
      refetch,
      errorMessage: 'Employee cannot be deleted',
      successMessage: 'Employee has been deleted',
   });

   return (
      <div className='list-wrapper'>
         <ul className='list'>
            {data
               ? data.data.map(({ id, name }) => (
                    <Item
                       name={name}
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
               text='add employee'
               styleType='success'
               className='list__add-btn'
               onClick={onAdd}
            />
         ) : null}
      </div>
   );
};

const Item = ({ name, onSelect, showBtns = true, onDelete }) => {
   return (
      <li className='item' onClick={onSelect}>
         <span>{name}</span>
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
