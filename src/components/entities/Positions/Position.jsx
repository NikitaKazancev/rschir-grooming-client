import { useParams } from 'react-router-dom';
import { useFindPositionByIdQuery } from '../../../api/apis/positionApi';
import { useFind } from '../../../hooks/useFind';
import { Input } from '../../UI/Input/Input';

export const Position = () => {
   const { id } = useParams();
   const { data } = useFind({
      queryHook: useFindPositionByIdQuery,
      queryHookParams: id,
   });

   return (
      <form className='item-data'>
         {data
            ? Object.entries(data.data).map(([key, value]) => (
                 <Input
                    label={key}
                    name={key}
                    value={value}
                    key={key}
                    readOnly
                 />
              ))
            : null}
      </form>
   );
};
