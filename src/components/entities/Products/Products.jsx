import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   useDeleteProductByIdMutation,
   useFindAllProductsQuery,
   useSaveProductMutation,
} from '../../../api/apis/productApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAddItem } from '../../../hooks/useAddItem';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Products = () => {
   const navigate = useNavigate();
   const { data, refetch } = useFind({ queryHook: useFindAllProductsQuery });
   const { onSelectItem } = useSelectItem();
   const { isAdmin } = useContext(AuthContext);

   const commonFields = [
      { label: 'name', name: 'name' },
      { label: 'duration', name: 'duration' },
      { label: 'price', name: 'price' },
   ];

   const { onAdd } = useAddItem({
      commonFields,
      mutationHook: useSaveProductMutation,
      refetch,
      errorMessage: 'Product with such name already exists',
      successMessage: 'Product has been created',
   });

   const { onDelete } = useDeleteItem({
      mutationHook: useDeleteProductByIdMutation,
      refetch,
      errorMessage: 'Product cannot be deleted',
      successMessage: 'Product has been deleted',
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
                       showBtns={isAdmin}
                       onSelect={e => onSelectItem(e, id)}
                       onChange={() => navigate(`${id}?isChanging=true`)}
                       onDelete={() => onDelete(id)}
                    />
                 ))
               : null}
         </ul>
         {isAdmin ? (
            <Btn
               text='add product'
               styleType='success'
               className='list__add-btn'
               onClick={onAdd}
            />
         ) : null}
      </div>
   );
};

const Item = ({ name, onSelect, showBtns = true, onDelete, onChange }) => {
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
