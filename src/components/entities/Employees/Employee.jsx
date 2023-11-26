import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
   useChangeEmployeeMutation,
   useFindEmployeeByIdQuery,
} from '../../../api/apis/employeeApi';
import { AuthContext } from '../../../contexts/AuthContext';
import { useChangeItem } from '../../../hooks/useChangeItem';
import { useFind } from '../../../hooks/useFind';
import { BlockWithTitle } from '../../UI/BlockWithTitle/BlockWithTitle';
import { Btn } from '../../UI/Btn/Btn';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';
import { Input } from '../../UI/Input/Input';

export const Employee = () => {
   const { isAdmin } = useContext(AuthContext);
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const { data, refetch } = useFind({
      queryHook: useFindEmployeeByIdQuery,
      queryHookParams: id,
   });

   const { isChanging, setIsChanging, onChange } = useChangeItem({
      id,
      initialData: data,
      mutationHook: useChangeEmployeeMutation,
      refetch,
      successMessage: 'Employee has been changed',
      initialChanging: searchParams.get('isChanging'),
   });

   const onCancel = () => {
      setIsChanging(false);
   };

   const extendedData = () => {
      if (!data) return null;

      return (
         <>
            <BlockWithTitle title={'position data'} isParentBlock>
               {Object.entries(data.data.position).map(([key, value]) => {
                  return (
                     <BlockWithTitle title={key} key={key}>
                        {value}
                     </BlockWithTitle>
                  );
               })}
            </BlockWithTitle>
            <BlockWithTitle title={'salon data'} isParentBlock>
               {Object.entries(data.data.salon).map(([key, value]) => {
                  return (
                     <BlockWithTitle title={key} key={key}>
                        {value}
                     </BlockWithTitle>
                  );
               })}
            </BlockWithTitle>
         </>
      );
   };

   return (
      <div className='item-data__wrapper'>
         <form onSubmit={onChange} className='item-data'>
            {' '}
            {data
               ? Object.entries(data.data).map(([key, value]) => (
                    <Input
                       label={
                          key == 'salon' || key == 'position' ? `${key}Id` : key
                       }
                       name={key}
                       value={
                          key == 'salon' || key == 'position' ? value.id : value
                       }
                       key={key}
                       readOnly={!isChanging || key == 'id' || key == 'name'}
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
         {extendedData()}
      </div>
   );
};
