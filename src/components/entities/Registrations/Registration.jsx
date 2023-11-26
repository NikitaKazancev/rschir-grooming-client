import { useParams, useSearchParams } from 'react-router-dom';
import { useFindRegistrationByIdQuery } from '../../../api/apis/registrationApi';
import { useFind } from '../../../hooks/useFind';
import { BlockWithTitle } from '../../UI/BlockWithTitle/BlockWithTitle';
import { Input } from '../../UI/Input/Input';

export const Registration = () => {
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const { data, refetch } = useFind({
      queryHook: useFindRegistrationByIdQuery,
      queryHookParams: id,
   });

   const extendedData = () => {
      if (!data) return null;

      return (
         <>
            <BlockWithTitle title={'product data'} isParentBlock>
               {Object.entries(data.data.product).map(([key, value]) => {
                  return (
                     <BlockWithTitle title={key} key={key}>
                        {value}
                     </BlockWithTitle>
                  );
               })}
            </BlockWithTitle>
            <BlockWithTitle title={'employee data'} isParentBlock>
               {Object.entries(data.data.employee).map(([key, value]) => {
                  return (
                     <BlockWithTitle title={key} key={key}>
                        {value}
                     </BlockWithTitle>
                  );
               })}
            </BlockWithTitle>
            <BlockWithTitle title={'user data'} isParentBlock>
               {Object.entries(data.data.user).map(([key, value]) => {
                  if (value === null || key == 'password') {
                     return null;
                  }
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
         <form className='item-data'>
            {' '}
            {data
               ? Object.entries(data.data).map(([key, value]) => (
                    <Input
                       label={
                          key == 'product' ||
                          key == 'employee' ||
                          key == 'user' ||
                          key == 'salon'
                             ? `${key}Id`
                             : key
                       }
                       name={key}
                       value={
                          key == 'product' ||
                          key == 'employee' ||
                          key == 'user' ||
                          key == 'salon'
                             ? value.id
                             : key == 'date'
                             ? new Date(value).toLocaleString()
                             : value
                       }
                       key={key}
                       readOnly
                    />
                 ))
               : null}
         </form>
         {extendedData()}
      </div>
   );
};
