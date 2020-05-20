import React from 'react'
import { Link} from "react-router-dom"
import onlineIcon from '../../Icons/Online.png'
import closeIcon from '../../Icons/close.png'

import './InfoBar.css'


const InfoBar = ({ room, leaveRoom }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
           <Link to="/"><img onClick={leaveRoom} src={closeIcon} alt="close" /></Link>
        </div>
    </div>


)

export default InfoBar