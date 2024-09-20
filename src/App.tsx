import React, { useState } from 'react';

import { initializeIcons, PrimaryButton, TextField } from '@fluentui/react';
import { loginRequest } from './authConfig';
import { callMsGraph } from './GraphService';
import { ProfileData } from './components/login/DisplayData';

import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import './App.css';

import { Login } from './components/login/login';
import UserDetail from './components/userDetail/userDetail';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      <h5 className="card-title">Bienvenido/a {accounts[0].name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <PrimaryButton onClick={RequestProfileData}>
          Ver Información del Perfil
        </PrimaryButton>
      )}
    </>
  );
};

initializeIcons();

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  const isAuthenticated = useIsAuthenticated();
  const [matricula, setMatricula] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (isFetching) {
    return (
      <>
        <UserDetail employeeId={matricula} />
      </>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <ProfileContent />
          <TextField
            label="Matricula"
            onChange={(_e, newValue) => setMatricula(newValue || '')}
            errorMessage={error}
            required={true}
          />
          <PrimaryButton
            onClick={() => {
              if (!matricula) {
                setError('Por favor ingrese una matrícula.');
                return;
              }
              setError('');
              setIsFetching(true);
            }}
          >
            Ver Materias
          </PrimaryButton>
        </>
      ) : (
        <h5>Iniciar sesión</h5>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Login>
      <MainContent />
    </Login>
  );
};

export default App;
