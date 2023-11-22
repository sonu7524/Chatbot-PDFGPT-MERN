import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Chatbox from "../components/Chatbox";

export default function ChatbotPage() {
    let [isUploading, setIsUploading] = useState(false);
    return (
        <div className="ChatbotPage">
            <FileUpload setIsUploading={setIsUploading} />
            <Chatbox className="Chatbox" isUploading={isUploading} />
        </div>
    );
}