import { useContext, useState } from 'react';
import { useFindProfileDataQuery } from '../../../api/apis/authApi';
import { Input } from '../../UI/Input/Input';
import { BtnGroup } from '../../UI/BtnGroup/BtnGroup';
import { Btn } from '../../UI/Btn/Btn';
import { useChangeUserMutation } from '../../../api/apis/userApi';
import { clearAuthData } from '../../../functions/auth';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../contexts/AlertContext';
import { BlockWithTitle } from '../../UI/BlockWithTitle/BlockWithTitle';

export const Profile = () => {
   const { data, refetch } = useFindProfileDataQuery();
   const [isChanging, setIsChanging] = useState(false);
   const [change] = useChangeUserMutation();
   const navigate = useNavigate();
   const { showAlert } = useContext(AlertContext);

   const onChange = e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const changedData = {
         firstname: formData.get('firstname'),
         lastname: formData.get('lastname'),
         phone: formData.get('phone'),
         birthday: formData.get('birthday'),
         dogBreed: formData.get('dogBreed'),
      };

      change(changedData).then(response => {
         console.log(response);
         if (response.error) {
            if (
               !response.error.data ||
               response.error.data.status == 403 ||
               response.error.data.status == 500
            ) {
               clearAuthData();
               navigate('/login');
               showAlert({
                  title: 'Try to login again',
               });
               return;
            }

            showAlert({
               type: 'error',
               title: 'Wrong input',
            });
            return;
         }

         setIsChanging(false);
         showAlert({
            type: 'success',
            title: 'Profile has been changed',
         });
         refetch;
      });
   };

   const onCancel = () => {
      setIsChanging(false);
   };

   const extendedData = () => {
      if (!data || !data.data.registrations) {
         return null;
      }

      const { registrations } = data.data;

      return (
         <BlockWithTitle
            title={'registrations'}
            isParentBlock
            rowDirection
            bigPadding
         >
            {registrations.map(registration => {
               const date = new Date(registration.date).toLocaleString();
               return (
                  <BlockWithTitle
                     title={date}
                     key={registration.id}
                     isParentBlock
                  >
                     {Object.entries(registration).map(([key, value]) => {
                        if (
                           key == 'employee' ||
                           key == 'product' ||
                           key == 'salon' ||
                           key == 'user'
                        ) {
                           return null;
                        }
                        return (
                           <BlockWithTitle title={key} key={key}>
                              {key == 'date' ? date : value}
                           </BlockWithTitle>
                        );
                     })}
                  </BlockWithTitle>
               );
            })}
         </BlockWithTitle>
      );
   };

   const withFirstZero = num => {
      if (num >= 10) {
         return num.toString();
      }

      return `0${num}`;
   };

   return (
      <div className='item-data__wrapper'>
         <form className='item-data' onSubmit={onChange}>
            {data
               ? Object.entries(data.data).map(([key, value]) => {
                    if (
                       key == 'password' ||
                       key == 'registrations' ||
                       (key == 'role' && value != 'ADMIN')
                    ) {
                       return null;
                    }
                    let birthday = undefined;
                    if (key == 'birthday') {
                       const date = new Date(value);
                       birthday = `${date.getFullYear()}-${withFirstZero(
                          date.getMonth()
                       )}-${withFirstZero(date.getDay())}`;
                    }
                    return (
                       <Input
                          label={key}
                          name={key}
                          value={key == 'birthday' ? birthday : value}
                          key={key}
                          readOnly={
                             !isChanging ||
                             key == 'id' ||
                             key == 'email' ||
                             key == 'role'
                          }
                          type={key == 'birthday' ? 'date' : 'text'}
                       />
                    );
                 })
               : null}
            {isChanging ? (
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
            )}
         </form>
         {extendedData()}
      </div>
   );
};
