// This file is to set up the structure for our application
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

//Router
//URL: '/' displays the Join component (First thing the client will see on the website, the client will insert data)
//URL: '/chat' displays the Chat component (When we have the data from the client, we will render the chat component)
const App = () => (
    <Router>
        <Route path='/' exact component={Join} />
        <Route path='/chat' component={Chat} />
    </Router>
)

export default App