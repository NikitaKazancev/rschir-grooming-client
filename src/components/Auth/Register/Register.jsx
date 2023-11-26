import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../api/apis/authApi';
import { AlertContext } from '../../../contexts/AlertContext';
import { setAuthData } from '../../../functions/auth';
import { Btn } from '../../UI/Btn/Btn';
import { Input } from '../../UI/Input/Input';
import '../auth.scss';

export const Register = () => {
   const navigate = useNavigate();
   const { showAlert } = useContext(AlertContext);
   const [register] = useRegisterMutation();

   const onSubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      register({
         email: formData.get('email'),
         password: formData.get('password'),
         firstname: formData.get('firstname'),
         lastname: formData.get('lastname'),
      }).then(response => {
         if (response.error || !response.data || response.data.status == 404) {
            showAlert({
               type: 'error',
               title: 'User with such email already existed',
            });
            return;
         }

         setAuthData({ jwt: response.data.jwt, role: response.data.role });
         navigate('/');
      });
   };

   return (
      <div className='auth' onSubmit={onSubmit}>
         <form className='auth__form'>
            <Input name={'email'} label={'Email'} />
            <Input name={'password'} label={'Password'} />
            <Input type={'text'} name={'firstname'} label={'First name'} />
            <Input type={'text'} name={'lastname'} label={'Last name'} />
            <div className='auth__btns'>
               <Link className='auth__another' to={'/login'}>
                  <i>&#10140;</i>
                  <span>Login</span>
               </Link>
               <Btn text={'Register'} uppercase={false} />
            </div>
         </form>
      </div>
   );
};
