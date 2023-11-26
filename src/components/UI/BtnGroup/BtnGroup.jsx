import { Btn } from '../Btn/Btn';
import './btnGroup.scss';

export const BtnGroup = ({
   btnsData = [
      {
         text: '',
         styleType: 'regular',
         type: 'submit',
         onClick: () => {},
         uppercase: true,
      },
   ],
}) => {
   return (
      <div className='btn-group'>
         {btnsData.map((btnData, i) => (
            <Btn {...btnData} key={i} />
         ))}
      </div>
   );
};
