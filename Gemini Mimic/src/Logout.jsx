import logo from "./logo.png";
import './Logout.css';
import { Button } from '@mui/material';

function Logout(){
    return (
        <div className="logo-wrapper">
            <div className="logo-logout">
                <img src={logo} id='gemini_logout_logo'/>
            </div>
            <div className="logout-line"/>

            <div className="main-ui-logout">
                <h1 id="logged-out-text">Logged Out</h1>
                <p id="thank-logout">Thank you for using Gemini Mimic!</p>
                <Button variant="contained" size="large" style={{ backgroundColor: '#E75A7C', color: '#FFFFFF' }}
>Sign In Again</Button>
            </div>

            <div className="logout-footer">
                <p id="footer-text"> © 2023 Jaskirt Kaler, Devesh Krishan. All rights reserved.</p>
            </div>

        </div>
    );
}

export default Logout;