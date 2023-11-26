import './alert.scss';

export const Alert = ({ type, title, isShown }) => {
   return (
      <div className={`alert ${type} ${isShown ? 'show' : ''}`}>{title}</div>
   );
};
