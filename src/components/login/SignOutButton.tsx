import React from 'react';
import { useMsal } from '@azure/msal-react';
import { PrimaryButton } from '@fluentui/react';

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/',
    });
  };

  return <PrimaryButton onClick={() => handleLogout()}>Sign Out</PrimaryButton>;
};
