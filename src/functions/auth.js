export const setAuthData = ({ jwt, role }) => {
   setJwt(jwt);
   setRole(role);
};

export const getAuthData = () => {
   return { jwt: getJwt(), role: getRole() };
};

export const setJwt = jwt => {
   localStorage.setItem('jwt', jwt);
};

export const getJwt = () => {
   return localStorage.getItem('jwt');
};

export const setRole = role => {
   localStorage.setItem('role', role);
};

export const getRole = () => {
   return localStorage.getItem('role');
};

export const isAdmin = () => {
   return getRole() == 'ADMIN';
};

export const clearAuthData = () => setAuthData({ jwt: '', role: '' });
