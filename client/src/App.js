import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join'
import Chat from './components/Chat'


//the client will first se the Join-component
const App = () => (
    <Router>
        <Route path='/' exact component={Join} />
        <Route path='/chat' exact component={Chat} />
    </Router>
)

export default App