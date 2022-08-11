import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../styles/Register.css";


import instagramName from "../images/instagramName.png"


export default function Register(){
    
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [userName, setUserName] = useState("")
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
        <div className="Register">
            <div className="register-box">
                <div className="logo">
                    <img src={instagramName} alt="Logo"/>
                    <p>Sign up to see photos and videos of your friends.</p>
                </div>

                <form>
                    <input 
                        type="text"
                        onChange={(e)=> setFullName(e.target.value)}
                        id="register-name" 
                        placeholder="Full Name"/>
                    <input 
                        type="text"
                        onChange={(e)=> setUserName(e.target.value)}
                        id="register-user" 
                        placeholder="User Name"/>
                    <input 
                        type="email"
                        onChange={(e)=> setEmail(e.target.value)}
                        id="register-email" 
                        placeholder="E-mail"/>
                    <input 
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        id="register-password" 
                        placeholder="Password"/>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            registerWithEmailAndPassword({
                                fullName: fullName,
                                userName: userName,
                                email: email,
                                password: password,
                            })
                        }
                    }>
                    Register
                    </button>
                </form>

                <div className="forgot-password">
                    <Link to="/account/login">Have an account?</Link>
                </div>
            </div>
        </div> 
    );
}

