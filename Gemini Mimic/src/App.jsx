import './App.css'
import './Login.jsx'
import Login from './Login'
import Home from "./Home"
import Signup from './Signup'

function App() {
  const login = true;
  if (login){

    return(
      <Login/>
      // click btn so then we move to Register
    )
      
  }else{
    return (
      <Home/>
    )
  }

}

export default App
