import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../components/MainPage/MainPage';
import { Login } from '../components/Auth/Login/Login';
import { Register } from '../components/Auth/Register/Register';
import { Salons } from '../components/entities/Salons/Salons';
import { Salon } from '../components/entities/Salons/Salon';
import { Products } from '../components/entities/Products/Products';
import { Product } from '../components/entities/Products/Product';
import { Positions } from '../components/entities/Positions/Positions';
import { Position } from '../components/entities/Positions/Position';
import { Employees } from '../components/entities/Employees/Employees';
import { Employee } from '../components/entities/Employees/Employee';
import { Registration } from '../components/entities/Registrations/Registration';
import { Registrations } from '../components/entities/Registrations/Registrations';
import { Salaries } from '../components/entities/Salary/Salaries';
import { Salary } from '../components/entities/Salary/Salary';
import { Profile } from '../components/Auth/Profile/Profile';

export const AppRoutes = () => {
   return (
      <Routes>
         <Route path='/' Component={MainPage} />
         <Route path='/login' Component={Login} />
         <Route path='/register' Component={Register} />

         <Route path='/salons' Component={Salons} />
         <Route path='/salons/:id' Component={Salon} />

         <Route path='/products' Component={Products} />
         <Route path='/products/:id' Component={Product} />

         <Route path='/positions' Component={Positions} />
         <Route path='/positions/:id' Component={Position} />

         <Route path='/employees' Component={Employees} />
         <Route path='/employees/:id' Component={Employee} />

         <Route path='/registrations' Component={Registrations} />
         <Route path='/registrations/:id' Component={Registration} />

         <Route path='/salary' Component={Salaries} />
         <Route path='/salary/:id' Component={Salary} />

         <Route path='/profile' Component={Profile} />
      </Routes>
   );
};
