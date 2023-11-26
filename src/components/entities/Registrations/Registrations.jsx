import {
   useDeleteRegistrationByIdMutation,
   useFindAllRegistrationsQuery,
   useSaveRegistrationMutation,
} from '../../../api/apis/registrationApi';
import { useAddItem } from '../../../hooks/useAddItem';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Registrations = () => {
   const { data, refetch } = useFind({
      queryHook: useFindAllRegistrationsQuery,
   });
   const { onSelectItem } = useSelectItem();

   const commonFields = [
      { label: 'date', name: 'date', type: 'date' },
      { label: 'productId', name: 'productId' },
      { label: 'employeeId', name: 'employeeId' },
      { label: 'comment', name: 'comment' },
   ];

   const { onAdd } = useAddItem({
      commonFields,
      mutationHook: useSaveRegistrationMutation,
      refetch,
      errorMessage: 'Employee not found',
      successMessage: 'Registration has been created',
   });

   const { onDelete } = useDeleteItem({
      mutationHook: useDeleteRegistrationByIdMutation,
      refetch,
      errorMessage: 'Registration cannot be deleted',
      successMessage: 'Registration has been deleted',
   });

   return (
      <div className='list-wrapper'>
         <ul className='list'>
            {data
               ? data.data.map(({ id, date }) => (
                    <Item
                       text={new Date(date).toLocaleString()}
                       id={id}
                       key={id}
                       onSelect={e => onSelectItem(e, id)}
                       onDelete={() => onDelete(id)}
                    />
                 ))
               : null}
         </ul>
         <Btn
            text='add registration'
            styleType='success'
            className='list__add-btn'
            onClick={onAdd}
         />
      </div>
   );
};

const Item = ({ text, onSelect, showBtns = true, onDelete }) => {
   return (
      <li className='item' onClick={onSelect}>
         <span>{text}</span>
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
