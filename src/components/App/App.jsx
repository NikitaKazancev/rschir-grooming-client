import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../contexts/AlertContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FormContext } from '../../contexts/FormContext';
import { getJwt, isAdmin } from '../../functions/auth';
import { useAlert } from '../../hooks/useAlert';
import { useForm } from '../../hooks/useForm';
import { AppRoutes } from '../../routes/AppRoutes';
import { Alert } from '../UI/Alert/Alert';
import { Form } from '../UI/Form/Form';
import '../UI/List/list.scss';
import './app.scss';
import { Header } from '../Header/Header';

export const App = () => {
   const navigate = useNavigate();
   const { alertData, showAlert } = useAlert();
   const { formData, showForm, closeForm } = useForm();

   useEffect(() => {
      const jwt = getJwt();

      if (!jwt) {
         navigate('/login');
         return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className='app'>
         <AuthContext.Provider value={{ isAdmin: isAdmin() }}>
            <AlertContext.Provider value={{ showAlert }}>
               <FormContext.Provider value={{ showForm, closeForm }}>
                  <Alert {...alertData} />
                  {formData.isShown ? <Form {...formData} /> : null}
                  <Header />
                  <main>
                     <AppRoutes />
                  </main>
               </FormContext.Provider>
            </AlertContext.Provider>
         </AuthContext.Provider>
      </div>
   );
};
