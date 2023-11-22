import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
 const Loader = () => {
    return (
        <div className="loader" style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>
            <h2>Please wait while we are embedding your file</h2>
            <CircularProgress />
        </div>
    )
};

export default Loader;