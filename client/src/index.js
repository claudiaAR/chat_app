//This file initiate our application built with react. 
import React from 'react'
import ReactDOM from 'react-dom'

//Imports the App component from App.js. 
import App from './App'

//Target our element in index.html with id: root and passing the App componenent to it.
ReactDOM.render(<App />, document.querySelector('#root'))






