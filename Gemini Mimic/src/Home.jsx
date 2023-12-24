import './App.css';
import logo from "./logo.png";

import { MagnifyingGlassCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';

function Home(){
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
    const menuOptionsImages = [
      <MagnifyingGlassCircleIcon className='img-home-wrapper'/> , 
      <BookOpenIcon className='img-home-wrapper'/>,
      <UserGroupIcon className='img-home-wrapper'/>,
      <UserIcon className='img-home-wrapper'/>
    ];
  
    const menuOptions = ["Explore Gemini" , "History", "About", "Account"];
  
    const listItems = menuOptions.map((option, index) => 
    <div key={index} className="menu-item">
        {menuOptionsImages[index]}
      <h2>{option}</h2>
    </div>
    );
  
    return (
      <>
          {listItems}
      </>
    )
  }  

export default Home;