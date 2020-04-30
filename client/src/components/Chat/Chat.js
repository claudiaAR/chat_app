import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import SideBar from '../SideBar/SideBar'


import './Chat.css'


//useEffect is for lifecycle methods for functions inside a component. 
//useEffect hooks explained: 
//Needs to have a arrow function. This function will run when the component renders (it can renders multiple times).
//Lifecycle: For example, UseEffect change the DOM on every click on button in the component.

//Empty variable that connects to the server.
//When we have a connection the ENDPOINT will change.
let socket;
    
const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [allOpenRooms, setAllOpenRooms] = useState([])
    const [allClosedRooms, setAllClosedRooms] = useState([])
    const ENDPOINT = 'localhost:5000'
    
     //We gets a URL back based on the value from name and room, store it in socket and connect it to the server.
    useEffect(() => {
        const { name, room, password } = queryString.parse(location.search)
        
        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)
       
       
        // Validation, if  name is taken or name and room are missing
        socket.emit('join', { name, room, password  }, (error) => {
            if(error) {
              alert(error);
            }
          });

          //This makes the URL change only when name and room values changes. 
        }, [ENDPOINT, location.search]);
    
    //welcoming message from server index.js 'join'
    useEffect(() => {
        socket.on('message', (message) => {
            //this is adding all messages to our messages array
            setMessages([...messages, message])
        })
        
        socket.on("usersInRoom", ({ users }) => {
            setUsers(users);
            
          });  
          
        //connects with emit on server side (index.js)
        // io.emit('allRooms',{ allRooms: getAllRooms() })
        socket.on("allOpenRooms", ({ allOpenRooms }) => {
              setAllOpenRooms(allOpenRooms)
          })
        
        socket.on("allClosedRooms", ({ allClosedRooms }) => {
            setAllClosedRooms(allClosedRooms)
        })
 
    }, [messages])


    //Function for sending messages, 'sendMessage' is a string that the server will recognise.
    const sendMessage = (event) => {
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
            
        }
    }

    console.log(users)

    
    return(
   
        <div className="outerContainer">
            <SideBar users={users} room={room} allOpenRooms={allOpenRooms} allClosedRooms={allClosedRooms} /> 
            <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
      
        
    )
}
export default Chat