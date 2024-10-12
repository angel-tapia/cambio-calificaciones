import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import { PrimaryButton } from '@fluentui/react';

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      throw e;
    });
  };
  return <PrimaryButton onClick={() => handleLogin()}>Ingresar</PrimaryButton>;
};
