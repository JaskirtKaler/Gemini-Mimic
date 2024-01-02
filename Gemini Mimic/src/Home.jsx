import './Home.css';
import logo from "./logo.png";
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { MagnifyingGlassCircleIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Logout from "./Logout"
import axios from 'axios';

import {test} from "./firebaseConfig"
import { collection, query, orderBy, getFirestore, Timestamp, addDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';


function Home(){
  test();
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
          addMessage={() => {
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


function GeminiMimicHomePageChatBox({ onMessageSend, inputValue, setInputValue }) {
  const firestore = getFirestore();
  const auth = getAuth();

  const messagesRef = collection(firestore, 'messages');

  const handleMessageSend = async (e) => {
    if (inputValue.trim() !== "") {
      onMessageSend(true);
  
      const { uid } = auth.currentUser;
      const who = "user";
  
      try {
        await addDoc(messagesRef, {
          text: inputValue,
          createdAt: Timestamp.now(),
          who,
          uid
        });
      } catch (error) {
        console.error("Error adding message: ", error);
      }

      
  
      setInputValue(""); // Clear the input field after sending
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

function MessageList() {
  const firestore = getFirestore();
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'));

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  return (
    <div className="message-list" style={{ overflowY: 'auto', maxHeight: '95rem' }}>
      {messages && messages.map((msg, index) => 
        <ChatMessage key={msg.id || index} message={msg} />
      )}
    </div>
  );
}

function ChatMessage(props) {
  const {text, uid} = props.message;



  return (
    <div className={`message user`}>
      <p className='test'>{text}</p>
    </div>

  ) 
}

export default Home;