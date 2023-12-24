import React, { useState } from 'react'
import './Login.css'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // handle login here
    console.log(email, " ", password)
  }
  return (
    <div className="login-main">
      <div className="login-contents">
       <h1>Login</h1>
       <label>
        Email:
        <input type="email" value={email} onChange={e =>setEmail(e.target.value)}></input>
       </label>
       <label>
        Password:
        <input type="password" value={password} onChange={e =>setPassword(e.target.value)}></input>
       </label>
       <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
