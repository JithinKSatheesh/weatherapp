import React from 'react'
import splash from '../assets/splash.png'


export default function Splash(props) {
    

    return (
        <>
            
            <div className="splash-container">
                <div className="space-20"></div>
                <div className="splash-text">
                    QUICK WEATHER REPORT
                </div>
                <div className="space-20"></div>
                <img src={splash}  />
            </div>
        </>
    )
}
