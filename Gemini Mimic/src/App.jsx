import './App.css';
import logo from "../public/logo.png";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';

function App() {

  return (
    <>
      <div className='wrapper'>

        <section className='left-column'>
          <GeminiMimicHomePageTitle/>
          <GeminiHomePageOptions/>
        </section>

        <section className='right-column'>

        </section>

      </div>
    </>
  )
}

function GeminiMimicHomePageTitle(){
  return (
      <div className="gemini_title">
        <img src={logo} id='gemini_logo'/>
        <h1>Gemini Mimic</h1>
      </div>
  )
}

function GeminiHomePageOptions(){
  const menuOptionsImages = [];
  const menuOptions = ["Explore Gemini, History, About, Account"];

  const listItems = menuOptions.map((option) => 
    <div>

      <p>{option}</p>
    </div>
    
    );

  return (
    <>
      <MagnifyingGlassCircleIcon/>
      <BookOpenIcon/>
      <UserGroupIcon/>
      <UserIcon/>

      <div>
        {listItems}
      </div>
    </>
  )
}


export default App
