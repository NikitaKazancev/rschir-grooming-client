import {
   useDeletePositionByIdMutation,
   useFindAllPositionsQuery,
   useSavePositionMutation,
} from '../../../api/apis/positionApi';
import { useAddItem } from '../../../hooks/useAddItem';
import { useDeleteItem } from '../../../hooks/useDeleteItem';
import { useFind } from '../../../hooks/useFind';
import { useSelectItem } from '../../../hooks/useSelectItem';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';

export const Positions = () => {
   const { data, refetch } = useFind({ queryHook: useFindAllPositionsQuery });
   const { onSelectItem } = useSelectItem();

   const commonFields = [{ label: 'name', name: 'name' }];

   const { onAdd } = useAddItem({
      commonFields,
      mutationHook: useSavePositionMutation,
      refetch,
      errorMessage: 'Position with such name already exists',
      successMessage: 'Position has been created',
   });

   const { onDelete } = useDeleteItem({
      mutationHook: useDeletePositionByIdMutation,
      refetch,
      errorMessage: 'Position cannot be deleted',
      successMessage: 'Position has been deleted',
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
                       onSelect={e => onSelectItem(e, id)}
                       onDelete={() => onDelete(id)}
                    />
                 ))
               : null}
         </ul>
         <Btn
            text='add position'
            styleType='success'
            className='list__add-btn'
            onClick={onAdd}
         />
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
