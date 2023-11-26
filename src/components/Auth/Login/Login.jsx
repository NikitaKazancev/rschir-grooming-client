import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../api/apis/authApi';
import { AlertContext } from '../../../contexts/AlertContext';
import { setAuthData } from '../../../functions/auth';
import { Btn } from '../../UI/Btn/Btn';
import { Input } from '../../UI/Input/Input';
import '../auth.scss';

export const Login = () => {
   const navigate = useNavigate();
   const { showAlert } = useContext(AlertContext);
   const [login] = useLoginMutation();

   const onSubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      login({
         email: formData.get('email'),
         password: formData.get('password'),
      }).then(response => {
         if (response.error || !response.data || response.data.status == 404) {
            showAlert({
               type: 'error',
               title: 'Wrong email or password',
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
            <div className='auth__btns'>
               <Link className='auth__another' to={'/register'}>
                  <i>&#10140;</i>
                  <span>Register</span>
               </Link>
               <Btn text={'Login'} uppercase={false} />
            </div>
         </form>
      </div>
   );
};
