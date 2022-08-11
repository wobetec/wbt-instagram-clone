import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../styles/Login.css";


import instagramName from "../images/instagramName.png"

export default function Login(){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/Home");
        }
    }, [user, loading]);


    return(
        <div className="Login">
            <div className="LoginForms">
            <div className="Login-box">
                <div className="logo">
                    <img src={instagramName} alt="Logo"/>
                </div>
                <form>
                    <input 
                        type="email"
                        onChange={(e)=> setEmail(e.target.value)}
                        id="login-email" 
                        placeholder="E-mail"/>
                    <input 
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        id="login-password" 
                        placeholder="Password"/>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            logInWithEmailAndPassword(email, password)
                        }
                    }>
                    Login
                    </button>
                </form>
                <div className="forgot-password">
                    <Link to="/account/reset">Forgot your password?</Link>
                </div>
            </div>

            <div className="SingUp-box">
                <span>Don't have an account yet? <Link to="/account/register">Sign Up</Link> </span> 
            </div>
        </div>
        </div> 
    );
}

