import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
// import TextContainer from '../TextContainer/TextContainer' 
//import styled from 'styled-components'

// const OuterContainer = styled.outerContainer`
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
//         background-color: #1A1A1D;
//      `
//      const Container = styled.outerContainer`
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         background: rgb(241, 240, 240);
//         border-radius: 8px;
//         height: 60%;
//         width: 35%;
//     `

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    // const [users, setUsers] = useState('')
    
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        
        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, () => {
              
        })
        
        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    //welcoming message from server index.js 'join'
    useEffect(() => {
        socket.on('message', (message) => {
            //this is adding all messages to our messages array
            setMessages([...messages, message])
        })

    }, [messages])

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
            // socket.emit.JSON.parse()('sendMessage', message, () => setMessage(''))
            
        }
    }


     console.log(message, messages)


    // TASK: display the people who is online right now
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
          {/* <TextContainer users={users}/> */}
        </div>
    )
}
export default Chat

     

    