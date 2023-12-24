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
      <>
        <div className='wrapper'>
          {/* <GeminiMimicTitle/> */}
        </div>
      </>
    )
  }

}

function GeminiMimicTitle(){
  return (
      <div className="gemini_title">
        <img src={logo} id='gemini_logo'/>
        <h1>Gemini Mimic</h1>
      </div>
  )
}

export default App
