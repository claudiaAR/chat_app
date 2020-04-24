import React from 'react'
// import onlineIcon from '../../icons/onlineIcon.png'
// import closedIcon from '../../icons/closedIcon.png' 

import './InfoBar.css'


const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            {/* <img className="onlineIcon" src={onlineIcon} alt="online" /> */}
            <p>online</p>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
           {/* <a href="/"><img src={closedIcon} alt="close" /></a> */}
           <a href="/"><p>closed</p></a>
        </div>
    </div>


)

export default InfoBar