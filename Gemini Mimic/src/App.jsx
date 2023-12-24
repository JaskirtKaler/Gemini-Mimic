import './App.css'
import logo from "../public/logo.png"
import './Login.jsx'
import Login from './Login'

function App() {
  const login = true;

  if (login){
    return(
      <Login/>
    )
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
