import './App.css';
import Login from './components/login/login';
import Header from './components/header/header';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

function App() {
  return (
    <div className="container">
      <Header />
      <Login />
    </div>
  );
}

export default App;
