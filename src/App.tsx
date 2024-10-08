import { useEffect, useState } from 'react';
import { initializeIcons, PrimaryButton, TextField } from '@fluentui/react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import './App.css';
import { Login } from './components/login/login';
import UserDetail from './components/userDetail/userDetail';
import { getMatricula } from './endpoints/getMatricula';

initializeIcons();

const MainContent = () => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const [matricula, setMatricula] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showMatriculaInput, setShowMatriculaInput] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchMatricula = async () => {
        try {
          const employeeEmail = accounts[0].username;
          const response = await getMatricula(employeeEmail);
          setMatricula(response.data);
          setIsFetching(true);
        } catch (e: any) {
          if (e.response && e.response.status === 404) {
            setShowMatriculaInput(true);
          } else {
            console.error('Error fetching the matricula from the email:', e);
            setError('An error occurred while fetching the matricula.');
          }
        }
      };
      fetchMatricula();
    }
  }, [isAuthenticated]);

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
          {showMatriculaInput ? (
            <>
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
            // Optionally, show a loading indicator while fetching
            <p>Cargando su información...</p>
          )}
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
