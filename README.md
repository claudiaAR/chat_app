# CHAT APP

## A simple chat app made with node.js, express, socket.io and create react app(react.js). 

### The app we built is both backend and frontend. 
All the files for backend is stored in the server folder. All the files for frontend is stored in the client folder. We have a .gitignore file that causes Git to ignore the node_modules folders.

### Client
In the client folder we first installed:
create-react-app

Then installed (npm install --save):
react-router-dom
react-scroll-to-bottom
react-emoji
socket.io-client
query-string

We deleted the src-map that came with building create-react-app and then created our own src-map.
    
### Server
In the server folder we installed:
npm init -y to make a package.json file

Then installed (npm install --save):
cors
nodemon
express
socket.io

In the servers package.json file, we change the start script to "nodemon index.js". This means that we don´t have to run: nodemon index.js in the terminal, we can just run: npm start and nodemon will listen to the index.js file.

