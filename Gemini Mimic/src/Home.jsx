import './Home.css';
import logo from "./logo.png";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { MagnifyingGlassCircleIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Logout from "./Logout"

function Home(){
  const [messageSent, setMessageSent] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("Message Google Gemini");

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
        { !messageSent && <GeminiHomeTitleWelcome/> }
        { messageSent && <MessageList messages={messages} /> }
        <GeminiMimicHomePageChatBox
          onMessageSend={setMessageSent}
          addMessage={(newMessage) => {
            setMessages([...messages, newMessage]);
            setMessageSent(true); // Set messageSent to true when a new message is added
          }}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
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
  const handleClick = (e) => {
    return (<Logout/>);
  }
  return (
    <div onClick={handleClick}>
      <div className='home-line'></div>

      <div className='home-log-out'>
        <p className='home-text-font'>Log out</p>
        <ArrowRightEndOnRectangleIcon className='img-home-wrapper'/>
      </div>

    </div>
  )
}

function TextArea({ inputValue, setInputValue, onSend }) {
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFocus = () => {
    if (inputValue === "Message Google Gemini") {
      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSend(inputValue); // Send message when Enter key is pressed
      setInputValue("");  // Clear the input field
    }
  };

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyPress={handleKeyPress}
      rows={1}
      variant="outlined"
      style={{ width: '100%' }}
    />
  );
}


function GeminiMimicHomePageChatBox({ onMessageSend, addMessage, inputValue, setInputValue }) {
  const handleMessageSend = () => {
    if (inputValue.trim() !== "") {
      addMessage({ text: inputValue, sender: 'user' });
      setInputValue(""); // Clear the input field after sending
      onMessageSend(true);
    }
  };

  return (
    <div className='chat-wrapper'>
      <div className='chat-interaction'>
        <TextArea inputValue={inputValue} setInputValue={setInputValue} onSend={handleMessageSend} />
        <div className='send-home-button' onClick={handleMessageSend}>
          <PaperAirplaneIcon className='img-home-wrapper' id='send-home-icon'/>
        </div>
      </div>
    </div>
  );
}


function GeminiHomeTitleWelcome(){
  return (
  <div className="gemini_welcome">
    <img src={logo} id='gemini_welcome_logo'/>
    <h2 id='gemini-welcome-text'>Hello! How can Google Gemini help you today?</h2>
  </div>
  )
}

function MessageList({ messages }) {
  return (
    <div className="message-list" style={{ overflowY: 'auto', maxHeight: '400px' }}>
      {messages.map((message, index) => (
        <p key={index} className={`message ${message.sender}`}>
          {message.text}
        </p>
      ))}
    </div>
  );
}


export default Home;