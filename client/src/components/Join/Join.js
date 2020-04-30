import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

//The client will first se the Join-component when they visit our App on url path='/'
//If the user click the button, it will route to path='/chat' component={Chat}
//if name and room dont have a value, the routing will not take place
const Join = () => {
    //useState hooks explained:
    //variable [stateful value, function to set/update the value] = useState(the initial value)
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Chat App</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}&password=${password}`}>
                    <button className="button mt-20" type="submit">Sign in</button>
                </Link>
            </div>
        </div>
    )
}
export default Join