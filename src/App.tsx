import './App.css';
import { useEffect, useState } from 'react';
import { initializeIcons, PrimaryButton, TextField } from '@fluentui/react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
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
      console.log(sessionStorage.getItem('Token'));

      console.log(accounts[0].idToken);
      const fetchMatricula = async () => {
        const employeeEmail = accounts[0].username;

        try {
          const response = await getMatricula(employeeEmail);
          setMatricula(response.data);
          setIsFetching(true);
        } catch (e: any) {
          if (
            e.response &&
            e.response.status === 404 &&
            employeeEmail === 'angel.tapiav@uanl.edu.mx'
          ) {
            setShowMatriculaInput(true);
          } else {
            setError('An error occurred while fetching the matricula.');
            throw new Error('An error occurred while fetching the matricula.');
          }
        }
      };
      fetchMatricula();
    }
  }, [isAuthenticated]);

  if (isFetching) {
    return <UserDetail employeeId={matricula} />;
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
