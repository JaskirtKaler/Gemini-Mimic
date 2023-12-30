import './App.css'
import './Login.jsx'
import Login from './Login'
import Home from "./Home"
import Signup from './Signup'

function App() {
  const login = true;
  const register = false;
  if (login){

    if(register){
      return(
        <Login/>
        // click btn so then we move to Register
      )
      
    }else{
      return(
        <Signup/>
      )
    }
  }
  
  else{
    return (
      <Home/>
    )
  }

}

export default App
