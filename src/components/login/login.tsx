import React from 'react';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';

/**
 * Renders the navbar component with a sign in or sign out button depending on whether or not a user is authenticated
 * @param props
 */
export const Login = (props: any) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <br />
      <br />
      <h5>
        <center>Bienvenido/a la página de Cambio de Calificaciones.</center>
      </h5>
      <br />
      <center>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</center>
      <br />
      {props.children}
    </>
  );
};
