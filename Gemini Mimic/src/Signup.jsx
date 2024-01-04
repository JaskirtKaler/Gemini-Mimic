import React, { useState} from 'react';
import './Signup.css'
import { app } from './firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import Home from './Home';
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth();
    const db = getFirestore();
    const [isSignedUp, setIsSignedUp] = useState(false); // to track signup status
   

    const handleSignup = async () =>{
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log('Signed up user:', user)
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {/* any user-specific data */ });
            const messageCollectionRef = collection(userDocRef, 'messages'); // message collection created 
            console.log('User signed up:', user.uid);
            // Create a new message document
            const messageData = {
              text: 'This is a test message',
              timestamp: new Date(),
              sender: currentUserUID,
              sentByUser: true,
              // Other relevant fields specific to your application or message structure
            };
            await addDoc(messageCollectionRef, messageData);// 

            setIsSignedUp(true);
        }catch(error){
            setError(Error.message)
        }
    }

    if(isSignedUp){
        return <Home />; // Render Home Component upon successful signup
    }

  return (
    
        
    <div className="signup-main">
      <div className="signup-contents">
        <div className="signup-title">
            <h1>Signup</h1>
        </div>

        <div className="signup-context">
            <input 
            className="inputs"
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            />
            <input 
            className="inputs"
            name='password'
            type='password'
            value={password}
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
            />
            <input 
            className="inputs"
            name='password'
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button className="inputs-btn" onClick={handleSignup}>Signup</button>
        </div>
        {/* In your JSX, display the error if it exists */}
    
      </div>
    </div>


  )
}

export default Signup