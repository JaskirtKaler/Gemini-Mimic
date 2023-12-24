import './App.css'
import './Login.jsx'
import Login from './Login'
import Home from "./Home"
import Register from './Register'

function App() {
  const login = false;
  const register = true;
  if (login){

    if(register){
      return(
        <Login/>
        // click btn so then we move to Register
      )
      
    }else{
      return(
        <Register />
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
