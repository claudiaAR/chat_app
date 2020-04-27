import React from 'react'

import './Message.css'

import ReactEmoji from 'react-emoji'

//user is in this case the sender of message
const Message = ({ message: { user, text }, name }) =>{ 
   let isSentByCurrentUser = false

   const trimmedName = name.trim().toLowerCase()
   
   if(user === trimmedName) {
    isSentByCurrentUser = true
   }
   
   return (
       isSentByCurrentUser
       ? (
           <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
           </div>
       )
        // if the user is not the sender of message
       : (
        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
   </div>
       )
   )

}

export default Message