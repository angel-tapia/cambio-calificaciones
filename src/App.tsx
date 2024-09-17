import { useState } from 'react';
import './App.css';
import Layout from './components/layout/layout';
import Login from './components/login/login';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

function App() {
  const [isLogged, setIsLogged] = useState<Boolean>(false);

  return (
    <>
      <Layout />
      <Login />
    </>
  );
}

export default App;
