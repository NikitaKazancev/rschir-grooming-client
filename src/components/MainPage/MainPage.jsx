import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './mainPage.scss';

export const MainPage = () => {
   const { isAdmin } = useContext(AuthContext);

   return (
      <div className='main-page'>
         <div className='list-wrapper'>
            <ul className='list'>
               <Link className='item' to={'salons'}>
                  SALONS
               </Link>
               <Link className='item' to={'products'}>
                  PRODUCTS
               </Link>
               {isAdmin ? (
                  <Link className='item' to={'positions'}>
                     POSITIONS
                  </Link>
               ) : null}
               <Link className='item' to={'employees'}>
                  EMPLOYEES
               </Link>
               {isAdmin ? (
                  <Link className='item' to={'registrations'}>
                     REGISTRATIONS
                  </Link>
               ) : null}
               {isAdmin ? (
                  <Link className='item' to={'salary'}>
                     SALARY
                  </Link>
               ) : null}
            </ul>
         </div>
      </div>
   );
};
