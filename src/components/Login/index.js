import React,{useState} from "react";
import "./styles.css";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png"
import axios from "axios";

export default function LoginComponent() {
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[error,setError] = useState("");

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (email && password) {
  console.log(email, password);
          try {
          const response = await axios.post("https://pdfgpt-u827.onrender.com/api/login", {
            email: email,
            password: password,
          });
    
          // Check if the response contains a token
          if (response.data.token) {
            // Save the token in localStorage
            localStorage.setItem("token", response.data.token);
            
            // Redirect to the "/chatbot" page
            window.location.href = "/chatbot";
          } else {
            setError("Invalid Credentials");
          }
        } catch (error) {
          console.error(error);
          setError("Invalid Credentials");
        }
      } else {
        setError("All fields are required");
      }
    };
    
    return (
        <div className="login">
            <img src={logo} alt="logo" />
            <form className="form-login">
                <p className="title">Login Now</p>
                <p className="message">Signup now and get full access to our app. </p> 
                <input onChange={handleEmail} required="" placeholder="Email" type="email" className="input"/>
                <input onChange={handlePassword} required="" placeholder="Password" type="password" className="input"/>
                {error && <span style={{color:"red"}} className="error">{error}</span>}
                <button onClick={handleSubmit} className="submit">Login</button>
                <p className="signin">Don't have an acount ? <Link to={"/signup"}>Register Now</Link> </p>
            </form>
        </div>
    )
}