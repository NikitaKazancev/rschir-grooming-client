import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
   useChangeSalonMutation,
   useFindSalonByIdQuery,
} from '../../../api/apis/salonApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useChangeItem } from '../../../hooks/useChangeItem';
import { useFind } from '../../../hooks/useFind';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';
import { Input } from '../../UI/Input/Input';

export const Salon = () => {
   const { isAdmin } = useContext(AuthContext);
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const { data, refetch } = useFind({
      queryHook: useFindSalonByIdQuery,
      queryHookParams: id,
   });

   const { isChanging, setIsChanging, onChange } = useChangeItem({
      id,
      initialData: data,
      mutationHook: useChangeSalonMutation,
      refetch,
      successMessage: 'Salon has been changed',
      initialChanging: searchParams.get('isChanging'),
   });

   const onCancel = () => {
      setIsChanging(false);
   };

   return (
      <form className='item-data' onSubmit={onChange}>
         {data
            ? Object.entries(data.data).map(([key, value]) => (
                 <Input
                    label={key}
                    name={key}
                    value={value}
                    key={key}
                    readOnly={!isChanging || key == 'id' || key == 'address'}
                 />
              ))
            : null}
         {isAdmin ? (
            isChanging ? (
               <BtnGroup
                  btnsData={[
                     {
                        text: 'cancel',
                        styleType: 'error',
                        type: 'button',
                        onClick: onCancel,
                     },
                     { text: 'ok', styleType: 'success' },
                  ]}
               />
            ) : (
               <Btn
                  text='change'
                  type='button'
                  onClick={() => setIsChanging(true)}
               />
            )
         ) : null}
      </form>
   );
};
