
import { useContext } from 'react';
import { AuthContext } from "../src/context/auth.context";

import Login from './components/loginComponent/Login'
import UserPanel from './pages/userPanelComponent/UserPanel';

import './App.css';

function App() {
  
  const {user} = useContext(AuthContext)

  console.log(user)


  return (
    <div className="App">
     {!user? 
        <Login></Login> 
        :
        <UserPanel></UserPanel>
     }
    </div>
  );
}

export default App;
