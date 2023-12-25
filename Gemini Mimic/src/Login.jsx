import React, { useState } from 'react'
import './Login.css'
import { app } from './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Home from "./Home"
export default function Login() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Track user authentication status
  const auth = getAuth();
  
  const handleInput = (event) =>{
    let newInput = { [event.target.name]: event.target.value}
    setData({ ...data, ...newInput});
  }


  const handleLogin = () => {
    // handle login here
    console.log('we got here') // no errors tell here
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user; // ---- remove later just for dev
    console.log(user);
    setUser(user); // update user state ... Successful Login
    // setError(null); // Clear any previous errors see if I want to use this later 
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log('Error:', errorCode, ' ', errorMessage);
    // setError(errorMessage);
    alert(error.message); // user not found in data base 
  });
  }

  if(user){
    return <Home />
  }


  return (
    <div className="login-main">
      <div className="login-contents">
       <h1>Login</h1>
       {/* <label>
        Email:
        <input type="email" value={email} onChange={e =>setEmail(e.target.value)}></input>
       </label> */}
       <input 
        name='email'
        type='email'
        placeholder='Email'
        onChange={(event) => handleInput(event)}
       />
       <input 
        name='password'
        type='password'
        placeholder='Password'
        onChange={(event) => handleInput(event)}
        />
       <button onClick={handleLogin}>Login</button>
        {/* In your JSX, display the error if it exists */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  )
}
