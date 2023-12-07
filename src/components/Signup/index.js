import React,{useState} from "react";
import "./styles.css";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import LineLoader from "../Loader/LineLoader";

export default function SignupComponent() {
    let[fullName,setFullName] = useState("");
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[confirmPassword,setConfirmPassword] = useState("");
    let[error,setError] = useState("");
    let[loading,setLoading] = useState(false);

    const handleFullName = (e)=>{
        setFullName(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        setLoading(true);

        setError("");
        if(fullName && email && password && confirmPassword){
            if(password === confirmPassword){
                const user = {
                    username: fullName,
                    email: email,
                    password: password
                }

                const auth = await axios.post("https://pdfgpt-u827.onrender.com/api/signup", user);
                if(auth.data){
                    setLoading(false);
                    window.location.href = "/";
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
                else{
                    setLoading(false);
                    setError("User Already Exists");
                }
            }else{
                setLoading(false);
                setError("Passwords do not match");
            }
        }
        else{
            setLoading(false);
            setError("All fields are required");
        }
    }

    return (
        <div>
            {loading ? ( <LineLoader /> ) : null}
                <div className="signup">
                    <img src={logo} alt="logo" />
                    <form class="form">
                        <p class="title">Register </p>
                        <p class="message">Signup now and get full access to our app. </p>
                        <input onChange={handleFullName} required="" placeholder="Full Name" type="text" class="input"/>
                        <input onChange={handleEmail} required="" placeholder="Email" type="email" class="input"/>
                        <input onChange={handlePassword} required="" placeholder="Password" type="password" class="input"/>
                        <input onChange={handleConfirmPassword} required="" placeholder="Confirm Password" type="password" class="input"/>
                        {error && <span style={{color:"red"}} class="error">{error}</span>}
                        <button onClick={handleSubmit} type="submit" class="submit">Submit</button>
                        <p class="signin">Already have an acount ? <Link to={"/"}>Signin</Link> </p>
                    </form>
                </div>
        </div>
    )
}