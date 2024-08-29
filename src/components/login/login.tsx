import * as React from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import './login.css';
import UserDetail from '../userDetail/userDetail';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogged, setIsLogged] = React.useState(false);
  const [errorEmployeeId, setErrorEmployeeId] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');

  const validateEmployeeId = (employeeId: string) => {
    if (!employeeId) {
      return 'Employee ID is required';
    }
    if (employeeId.length < 5) {
      return 'Employee ID must be at least 5 characters long';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleValidation = (employeeId: string, password: string) => {
    const employeeIdError = validateEmployeeId(employeeId);
    const passwordError = validatePassword(password);

    if (employeeIdError) {
      setErrorEmployeeId(employeeIdError);
      return true;
    } else {
      setErrorEmployeeId('');
    }

    if (passwordError) {
      setErrorPassword(passwordError);
      return true;
    } else {
      setErrorPassword('');
    }
    return false;
  };

  const handleLogin = () => {
    if (handleValidation(employeeId, password)) {
      return;
    }
    setIsLogged(true);
  };

  if (isLogged) {
    return <UserDetail employeeId={employeeId} />;
  }

  return (
    <div className="loginContainer">
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300 } }}>
        <TextField
          label="Employee ID"
          value={employeeId}
          onChange={(_, newValue) => {
            setEmployeeId(newValue || '');
            setErrorEmployeeId('');
          }}
          errorMessage={errorEmployeeId}
          required
        />
        <TextField
          label="Password"
          type="password"
          canRevealPassword
          revealPasswordAriaLabel="Show password"
          value={password}
          onChange={(_, newValue) => {
            setPassword(newValue || '');
            setErrorPassword('');
          }}
          errorMessage={errorPassword}
          required
        />
        <PrimaryButton text="Login" onClick={handleLogin} />
      </Stack>
    </div>
  );
};

export default Login;
