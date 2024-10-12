import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

export const Login = (props: any) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {isAuthenticated ? (
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <SignOutButton />
        </div>
      ) : (
        <center>
          <h5>Bienvenido/a a la página de Cambio de Calificaciones.</h5>
          <SignInButton />
        </center>
      )}
      {props.children}
    </div>
  );
};
