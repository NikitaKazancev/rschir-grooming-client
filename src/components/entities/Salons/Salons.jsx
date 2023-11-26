import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   useDeleteSalonByIdMutation,
   useFindAllSalonsQuery,
   useSaveSalonMutation,
} from '../../../api/apis/salonApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAddItem } from '../../../hooks/useAddItem';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Salons = () => {
   const navigate = useNavigate();
   const { data, refetch } = useFind({ queryHook: useFindAllSalonsQuery });
   const { onSelectItem } = useSelectItem();
   const { isAdmin } = useContext(AuthContext);

   const commonFields = [
      { label: 'address', name: 'address' },
      { label: 'name', name: 'name' },
      { label: 'phone', name: 'phone' },
   ];

   const { onAdd } = useAddItem({
      commonFields,
      mutationHook: useSaveSalonMutation,
      refetch,
      errorMessage: 'Salon with such address already exists',
      successMessage: 'Salon has been created',
   });

   const { onDelete } = useDeleteItem({
      mutationHook: useDeleteSalonByIdMutation,
      refetch,
      errorMessage: 'Salon cannot be deleted',
      successMessage: 'Salon has been deleted',
   });

   return (
      <div className='list-wrapper'>
         <ul className='list'>
            {data
               ? data.map(({ id, name }) => (
                    <Item
                       name={name}
                       id={id}
                       key={id}
                       onSelect={e => onSelectItem(e, id)}
                       showBtns={isAdmin}
                       onChange={() => navigate(`${id}?isChanging=true`)}
                       onDelete={() => onDelete(id)}
                    />
                 ))
               : null}
         </ul>
         {isAdmin ? (
            <Btn
               text='add salon'
               styleType='success'
               className='list__add-btn'
               onClick={onAdd}
            />
         ) : null}
      </div>
   );
};

const Item = ({ name, onSelect, showBtns, onDelete, onChange }) => {
   return (
      <li className='item' onClick={onSelect}>
         <span>{name}</span>
         {showBtns ? (
            <BtnGroup
               btnsData={[
                  { text: 'change', styleType: 'warning', onClick: onChange },
                  { text: 'delete', styleType: 'error', onClick: onDelete },
               ]}
            />
         ) : null}
      </li>
   );
};
