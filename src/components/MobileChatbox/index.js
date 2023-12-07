import React from "react";
import logo from "../../assets/logo.png";
import Chatbox from "../Chatbox";
import "./styles.css";

export default function MobileChatbox() {
    return (
        <div className="mobile-chatbox">
            <div className="mobile-header">
                <img style={{width: '5rem'}} src={logo} />
                <h1>PDFGPT Chatbox</h1>
            </div>
            <div>
                <Chatbox />
            </div>
        </div>
    )
}