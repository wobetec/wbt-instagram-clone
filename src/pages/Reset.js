import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordReset} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../styles/Reset.css";


import instagramName from "../images/instagramName.png"

export default function Reset(){
    
    const [email, setEmail] = useState("")
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
        <div className="Reset">
            <div className="resetBox">
                <div className="logo">
                    <img src={instagramName} alt="Logo"/>
                </div>

                <p>Type your email</p>
                
                <input type="text" id="reset-password" placeholder="E-mail" />

                <button onClick={(e) =>{sendPasswordReset(email)}} >Send</button>
            </div>
        </div> 
    );
}

