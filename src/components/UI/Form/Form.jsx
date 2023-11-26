import { useContext } from 'react';
import { BtnGroup } from '../BtnGroup/BtnGroup';
import { Input } from '../Input/Input';
import { FormContext } from '../../../contexts/FormContext';
import './form.scss';

export const Form = ({
   commonFields = [
      { name: '', label: '', value: '', hidden: false, type: 'text' },
   ],
   selectFields = [],
   handleData = () => {},
}) => {
   const { closeForm } = useContext(FormContext);

   const onSubmit = e => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {};
      commonFields.forEach(({ name }) => {
         data[name] = formData.get(name);
      });
      selectFields.forEach(({ name }) => {
         data[name] = formData.get(name);
      });

      handleData(data);
   };

   const onCancel = () => {
      closeForm();
   };

   return (
      <div className='form' onSubmit={onSubmit}>
         <form className='form__form'>
            {commonFields.map((field, i) => (
               <Input key={i} {...field} />
            ))}

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
         </form>
      </div>
   );
};
