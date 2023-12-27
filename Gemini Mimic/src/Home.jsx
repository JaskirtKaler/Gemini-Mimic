import './Home.css';
import logo from "./logo.png";
import { TextField } from '@mui/material';

import { useState } from 'react';
import { MagnifyingGlassCircleIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

function Home(){

  return (
    <div className='wrapper'>

      <section className='left-column'>
        <div >
          <GeminiMimicHomePageTitle/>
          <GeminiHomePageOptions/>
        </div>

        <GeminiMimicHomePageLogOut/>

      </section>

      <section className='right-column'>
        <GeminiHomeTitleWelcome/>
        <GeminiMimicHomePageChatBox/>
      </section>

    </div>
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
    <p className='home-text-font'>{option}</p>
  </div>
  );

  return (
    <>
        {listItems}
    </>
  )
}  

function GeminiMimicHomePageLogOut(){
  return (
    <div>
      <div className='home-line'></div>

      <div className='home-log-out'>
        <p className='home-text-font'>Log out</p>
        <ArrowRightEndOnRectangleIcon className='img-home-wrapper'/>
      </div>

    </div>
  )
}

function TextArea(){
  const [inputValue, setInputValue] = useState("Message Google Gemini");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    if (inputValue == "Message Google Gemini"){
      setInputValue("");
    }
  };

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      rows={1}
      variant="outlined"
      style={{ width: '100%' }}
    />
  )
}

function GeminiMimicHomePageChatBox(){
  return (
    <div className='chat-wrapper'>
      <div className='chat-interaction'>
        <TextArea/>
        <div className='send-home-button'>
          <PaperAirplaneIcon className='img-home-wrapper' id='send-home-icon'/>
        </div>
      </div>
    </div>
  )
}

function GeminiHomeTitleWelcome(){
  return (
  <div className="gemini_welcome">
    <img src={logo} id='gemini_welcome_logo'/>
    <h2 id='gemini-welcome-text'>Hello! How can Google Gemini help you today?</h2>
  </div>
  )
}

export default Home;