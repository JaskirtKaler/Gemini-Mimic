import React, { useState } from 'react'
import './Login.css'
import { app } from './firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [data, setData] = useState({})
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const handleLogin = () => {
    // handle login here
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    console.log(email, " ", password)
  }

  
  const handleInput = (event) =>{
    let newInput = { [event.target.name]: event.target.value}
    setData({ ...data, ...newInput});
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
        placeholder='Email'
        onChange={(event) => handleInput(event)}
       />
       <input 
        name='password'
        placeholder='Password'
        onChange={(event) => handleInput}
        />
       <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
