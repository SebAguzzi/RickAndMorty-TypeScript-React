import React from 'react';

export { HomePage } from './home';

// Lazy load lee la exportación por defecto, 
// asi que debemos cambiar a export default el archivo Detail y LoginPage
// Lazy load permite agilizar la carga de ciertos componentes !!!!!!!

export const LoginPage = React.lazy(() => import('./login'))
export const RegisterPage = React.lazy(() => import('./register'))
export const Detail = React.lazy(() => import('./detail'))
