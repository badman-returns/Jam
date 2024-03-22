import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/logix';
import { useLogin } from './hooks/useLogin';

function App() {
  const [authenticated] = useLogin();
  return (
    <>
      {authenticated ? <Home /> : <Login />}
    </>

  );
}

export default App;
