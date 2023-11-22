import React from "react";
import FileUpload from "../components/FileUpload";
import Chatbox from "../components/Chatbox";

export default function ChatbotPage() {
    return (
        <div className="ChatbotPage">
            <FileUpload />
            <Chatbox className="Chatbox" />
        </div>
    );
}