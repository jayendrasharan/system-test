import React from 'react';
import './LoaderView.scss';
import loaderSvg from '../../../../assets/logo.svg'
const LoaderView = ({loader})=>{
    if(loader.show){
        return (
            <div className="loader-wrapper">
                <img src={loaderSvg} className="loading-item"/>
            </div>
        )
    }else{
        return null;
    }
}

export default LoaderView;