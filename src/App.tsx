import React, { useState } from 'react';

import { initializeIcons, TextField } from '@fluentui/react';
import { loginRequest } from './authConfig';
import { callMsGraph } from './GraphService';
import { ProfileData } from './components/login/DisplayData';

import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';
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
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </Button>
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
          />
          <Button variant="primary" onClick={() => setIsFetching(true)}>
            Ver materias
          </Button>
        </>
      ) : (
        <h5>Not signed in</h5>
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
