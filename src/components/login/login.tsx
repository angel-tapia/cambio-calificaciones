import React from 'react';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

export const Login = (props: any) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated ? (
        <div className="top-right-corner">
          <SignOutButton />
        </div>
      ) : (
        <>
          <center>
            <h5>Bienvenido/a a la página de Cambio de Calificaciones.</h5>
            <SignInButton />
          </center>
        </>
      )}
      {props.children}
    </>
  );
};
