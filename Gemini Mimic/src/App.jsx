import './App.css'
import logo from "../public/logo.png"

function App() {

  return (
    <>
      <div className='wrapper'>

        <section>
          <GeminiMimicTitle/>
        </section>

        <section className='right-column'>

        </section>

      </div>
    </>
  )
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
