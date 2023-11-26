import './blockWithTitle.scss';

export const BlockWithTitle = ({
   title,
   children,
   isParentBlock,
   rowDirection = false,
   bigPadding = false,
}) => {
   return (
      <div
         className={`block-with-title ${isParentBlock ? 'isParentBlock' : ''} ${
            rowDirection ? 'rowDirection' : ''
         } ${bigPadding ? 'bigPadding' : ''}`}
      >
         <label className='block-with-title__title'>{title}</label>
         {children}
      </div>
   );
};
