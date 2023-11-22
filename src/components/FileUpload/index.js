import React, { useState } from "react";
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ToastContainer, toast } from "react-toastify";
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import pdflogo from '../../assets/pdf-logo.png';
import logo from '../../assets/logo-transparent.png';

export default function FileUpload({setIsUploading}) {
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const handleFileChange = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          setSelectedFiles((oldArray) => [...oldArray, files[i]]);
        }
    };

    const handleDelete = async (fileName, index) => {
      setIsUploading(true);
      setSelectedFiles((oldArray) => oldArray.filter((file, i) => i !== index));
      try{
        await axios.delete(`https://pdfgpt-u827.onrender.com/api/delete/${fileName}`);
        setIsUploading(false);
        toast.success('File deleted successfully');
      }
      catch(error){
        console.error(error);
        setIsUploading(false);
        toast.error('Error deleting file');
      }
    }

    const handleUpload = async (e) => {
      e.preventDefault();
      setIsUploading(true);
        const formData = new FormData();
        
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('pdfs', selectedFiles[i]);
        }
        
        try {
          await axios.post('https://pdfgpt-u827.onrender.com/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setIsUploading(false);
          toast.success('Files uploaded successfully');
        } catch (error) {
          console.error('Error uploading files:', error);
          setIsUploading(false);
          toast.error('Error uploading files');
        }
      };
    return (
      
        <form className="file-upload">
          <img style={{width: '15rem'}} src={logo} />
          <ToastContainer position="top-right" autoClose={3000}  />
            <label className="custum-file-upload">
            <div className="icon">
                <CloudUploadIcon sx={{ fontSize: 80 }} />
            </div>
            <div className="text">
                <span>Click to upload image</span>
            </div>
            <input accept=".pdf" onChange={handleFileChange} multiple type="file" id="file"/>
            </label>
            <button className="upload" onClick={handleUpload}>Upload</button>
            <div className="uploaded-pdfs">
                {selectedFiles.map((file,index) => (
                    <div className="file" key={index}>
                      <div className="file-info">
                        <img className="pdf-logo" src={pdflogo} alt="pdf logo" />
                        <p>{file.name}</p>
                      </div>
                      <div>
                        <a onClick={() => handleDelete(file.name, index)} className="delete"><CloseRoundedIcon sx={{color: 'red'}} /></a>
                      </div>
                    </div>
                ))}
                
            </div>

        </form>
    );
}