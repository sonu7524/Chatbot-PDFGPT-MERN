import React from "react";
import Typewriter from "typewriter-effect";
import './styles.css';

const ChatMessage = ({ text, isUser, image, isLoading }) => {
  return (
    <div className="messenger">
    <div className={`chat-message ${isUser ? "user" : "chatbot"}`}>
      {image && <img src={image} alt="Attached" className={`message ${isUser ? "user-image" : "chatbot-image"}`} />}
      {isUser ? (
        <p>{text}</p>
      ) : (
        <div>
            {isLoading ? (
                <Typewriter
                    options={{
                        delay: 80,
                        autoStart: true,
                        loop: true,
                        strings: [" .", " .", " ."],
                    }}
                />
            ) : (
                <Typewriter
                    options={{
                        delay: 30,
                    }}
                    onInit={(typewriter) => {
                        typewriter
                        .typeString(text)
                        .callFunction(() => {
                            console.log("String typed out!");
                        })
                        .pauseFor(60000)
                        .deleteAll()
                        .callFunction(() => {
                            console.log("All strings were deleted");
                        })
                    .start();
                    }}
                />
            )}
        </div>
      )}
    </div>
    </div>
  );
};

export default ChatMessage;