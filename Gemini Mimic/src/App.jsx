import './App.css'
import logo from "../public/logo.png"
import './Login.jsx'
import Login from './Login'
import Register from './Register'
function App() {
  const login = true;
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
