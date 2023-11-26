import { useParams } from 'react-router-dom';
import { useFindSalaryByIdQuery } from '../../../api/apis/salaryApi';
import { useFind } from '../../../hooks/useFind';
import { BlockWithTitle } from '../../UI/BlockWithTitle/BlockWithTitle';
import { Input } from '../../UI/Input/Input';

export const Salary = () => {
   const { id } = useParams();
   const { data } = useFind({
      queryHook: useFindSalaryByIdQuery,
      queryHookParams: id,
   });

   const extendedData = () => {
      if (!data) return null;

      return (
         <>
            <BlockWithTitle
               title={'salary by employee'}
               isParentBlock
               rowDirection
            >
               {data.data.employees.map(({ employee, salary }) => {
                  if (!employee) {
                     return null;
                  }

                  return (
                     <BlockWithTitle
                        title={"employee's salary"}
                        key={employee.id}
                        isParentBlock
                        bigPadding
                     >
                        <BlockWithTitle
                           title={'employee'}
                           key={employee.id}
                           isParentBlock
                        >
                           {Object.entries(employee).map(([key, value]) => {
                              return (
                                 <BlockWithTitle title={key} key={key}>
                                    {value}
                                 </BlockWithTitle>
                              );
                           })}
                        </BlockWithTitle>

                        <BlockWithTitle title={'salary'}>
                           {salary}
                        </BlockWithTitle>
                     </BlockWithTitle>
                  );
               })}
            </BlockWithTitle>
            <BlockWithTitle title={'salon'} isParentBlock>
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
            {data
               ? Object.entries(data.data).map(([key, value]) => (
                    <Input
                       label={
                          key == 'salon'
                             ? 'SalonId'
                             : key == 'employees'
                             ? "Employees' ids"
                             : key
                       }
                       name={key}
                       value={
                          key == 'month'
                             ? new Date(value).toLocaleString()
                             : key == 'salon'
                             ? value.id
                             : key == 'employees'
                             ? value.reduce(
                                  (a, b) =>
                                     `${a.employee ? a.employee.id : ''}, ${
                                        b.employee ? b.employee.id : ''
                                     }`
                               )
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
