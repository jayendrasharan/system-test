import React from 'react';
import '../css/LoadingIndicator.css'
const LoadingIndicator = () => {
    return (
        <div className="lds-spinner">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>  
    );
}

export default LoadingIndicator;