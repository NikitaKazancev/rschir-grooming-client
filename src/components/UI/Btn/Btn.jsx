import './btn.scss';

export const Btn = ({
   text = '',
   styleType = 'regular',
   onClick = () => {},
   uppercase = true,
   className = '',
   type = 'submit',
}) => {
   return (
      <button
         className={`btn ${styleType} ${
            uppercase ? 'uppercase' : ''
         } ${className}`}
         type={type}
         onClick={onClick}
      >
         {text}
      </button>
   );
};
