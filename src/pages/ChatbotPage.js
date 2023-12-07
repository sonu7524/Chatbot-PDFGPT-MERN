import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Chatbox from "../components/Chatbox";
import MobileChatbox from "../components/MobileChatbox";
import "../App.css";

export default function ChatbotPage() {
    let [isUploading, setIsUploading] = useState(false);
    return (
        <div className="ChatbotPage">
            <div className="desktopChatbox">
                <FileUpload setIsUploading={setIsUploading} />
                <Chatbox className="Chatbox" isUploading={isUploading} />
            </div>
            <div className="MobileChatbox">
                <MobileChatbox />
                <FileUpload setIsUploading={setIsUploading} />
            </div>
        </div>
    );
}