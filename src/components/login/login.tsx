import * as React from 'react';
import { TextField, PrimaryButton, Stack } from '@fluentui/react';
import './login.css';
import SubjectDetail from '../subjectDetail/subjectDetail';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogged, setIsLogged] = React.useState(false);

  const handleLogin = () => {
    console.log('hello' + employeeId + password + 'world' + isLogged + '!');
    setIsLogged(true);
  };

  if (isLogged) {
    return <SubjectDetail />;
  }

  return (
    <div className="loginContainer">
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300 } }}>
        <TextField
          label="Employee ID"
          value={employeeId}
          onChange={(_, newValue) => setEmployeeId(newValue || '')}
          required
        />
        <TextField
          label="Password"
          type="password"
          canRevealPassword
          revealPasswordAriaLabel="Show password"
          value={password}
          onChange={(_, newValue) => setPassword(newValue || '')}
          required
        />
        <PrimaryButton text="Login" onClick={handleLogin} />
      </Stack>
    </div>
  );
};

export default Login;
