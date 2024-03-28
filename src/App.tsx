import Home from './components/Home/Home';
import Login from './components/Login/logix';
import { useLogin } from './hooks/useLogin';
import './style.scss';

function App() {
  const [authenticated] = useLogin();
  return (
    <>
      {authenticated ? <Home /> : <Login />}
    </>

  );
}

export default App;
