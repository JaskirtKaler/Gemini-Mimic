import './Home.css';
import logo from "./logo.png";
import { TextField } from '@mui/material';
import { useState } from 'react';
import { MagnifyingGlassCircleIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { BookOpenIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

import {test} from "./firebaseConfig"
import { collection, query, orderBy, getFirestore, Timestamp, addDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <div onClick={handleLogout}>
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
      onSend(inputValue);
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


  const handleMessageSend = async (e) => {
    const trimmedInput = inputValue.trim();
    onMessageSend(true);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No user signed in to send a message.");
      return;
    }

    if (trimmedInput !== "") {  
      const userMessagesRef = collection(firestore, 'users', currentUser.uid, 'messages');
  
      try {
        const userMessageDocRef = await addDoc(userMessagesRef, {
          text: trimmedInput,
          createdAt: Timestamp.now(),
          type: 'user',
          uid: currentUser.uid
        });
      } catch (error) {
        console.error("Error adding user message: ", error);
      }

      let serverResponse;
      try {
        const response = await axios.post('http://127.0.0.1:5000/chat', { message: trimmedInput });
        serverResponse = response.data.response;
      } catch (error) {
        console.error("Error getting server response: ", error);
        serverResponse = "Sorry, I'm having trouble understanding that right now.";
      }

      try {
        const serverMessageDocRef = await addDoc(userMessagesRef, {
          text: serverResponse,
          createdAt: Timestamp.now(),
          type: 'server',
          uid: currentUser.uid
        });
      } catch (error) {
        console.error("Error adding server message: ", error);
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
  const auth = getAuth(); 
  const user = auth.currentUser;

  const messagesRef = collection(firestore, 'users', user.uid, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));

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
  const {text, type} = props.message;

  return (
    <div className={`message ${type}`}>
      <p className='test'>{text}</p>
    </div>

  ) 
}

export default Home;