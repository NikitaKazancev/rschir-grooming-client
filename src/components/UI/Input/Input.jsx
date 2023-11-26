import './input.scss';

export const Input = ({
   name,
   label,
   value = '',
   hidden = false,
   disabled = false,
   readOnly = false,
   type = 'text',
}) => {
   return (
      <div className={`input-group ${hidden ? 'hidden' : ''}`}>
         <input
            name={name}
            autoComplete='off'
            className='input'
            placeholder=' '
            defaultValue={value}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
         />
         <label className='user-label'>{label}</label>
      </div>
   );
};
