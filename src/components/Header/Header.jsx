import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { clearAuthData } from '../../functions/auth';

export const Header = () => {
   const navigate = useNavigate();
   const { isAdmin } = useContext(AuthContext);

   const onLogout = () => {
      navigate('/login');
      clearAuthData();
   };

   return (
      <header className='header'>
         <ul className='header__links'>
            <Link className='item' to={'/'}>
               Main
            </Link>
            <Link className='item' to={'/salons'}>
               Salons
            </Link>
            <Link className='item' to={'/products'}>
               Products
            </Link>
            {isAdmin ? (
               <Link className='item' to={'/positions'}>
                  Positions
               </Link>
            ) : null}
            <Link className='item' to={'/employees'}>
               Employees
            </Link>
            {isAdmin ? (
               <Link className='item' to={'/registrations'}>
                  Registrations
               </Link>
            ) : null}
            {isAdmin ? (
               <Link className='item' to={'/salary'}>
                  Salary
               </Link>
            ) : null}
         </ul>
         <div className='header__right'>
            <div className='header__auth'>
               <Link className='header__register' to={'/register'}>
                  Register
               </Link>
               &nbsp;/&nbsp;
               <Link className='header__login' to={'/login'}>
                  Login
               </Link>
               &nbsp;/&nbsp;
               <span onClick={onLogout}>Logout</span>
            </div>
            <Link className='header__profile' to='/profile'>
               <img
                  src='https://cdn-icons-png.flaticon.com/512/9308/9308008.png'
                  height={30}
               />
            </Link>
         </div>
      </header>
   );
};
