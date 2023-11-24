import React, { useState } from "react";
import ChatMessage from "../ChatMessage";
import axios from "axios";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './styles.css';
import user from '../../assets/user.png';
import bot from '../../assets/bot.png';
import Loader from "../Loader";


//import {chatbotImage} from './chatbot.png';
const Chatbox = ({isUploading}) => {
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  let [userMessage, setUserMessage] = useState("");
  let[ isLoading, setIsLoading] = useState(true);


  const handleUserInput = async () => {
    setChatbotResponse("");
    setUserMessage(userInput);    
    await axios.get(`https://pdfgpt-u827.onrender.com/api/ask?question=${encodeURIComponent(userInput)}`)
      .then((response) => {
        setChatbotResponse(response.data.result.text);
        setIsLoading(false);
        console.log(chatbotResponse);
      })
      .catch((error) => {
        console.error(error);
        setChatbotResponse("Something went wrong!");
        setIsLoading(false);
      });
      setUserInput("");
  };
  return (
    <div className="chatbox-container">
        <div style={{textAlign: 'center', margin: '30px 0px', color:'darkblue'}}>
            <h1>Chat Box</h1>
        </div>
      {isUploading ? (
        <Loader />
      ) : (
        <div>
            <div className="chat-messages">
              {userMessage && <ChatMessage text={userMessage} isUser={true} image={user} />}
              {chatbotResponse && (
                <ChatMessage text={chatbotResponse} isUser={false} image={bot} isLoading={isLoading} />
              )}
            </div>
            <div className="chatbox">
              <input onChange={(e) => setUserInput(e.target.value)} value={userInput} type="text" placeholder="Enter your question" id="text" />
              <button onClick={handleSend} id="send">Send<SendRoundedIcon/></button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;