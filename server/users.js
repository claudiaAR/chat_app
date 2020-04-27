const users = []

const addUser = ({ id, name, room }) => {
    // Javascript Mastery = javascriptmastery
    //This is to know what string data we are using 
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    
    // Checking if the username is free.
    const existingUser = users.find((user) => user.room === room && user.name === name )

    // Validation of name and room inputs.
    if(!name || !room) return { error: 'Username and room are required.' };

    //if the user try to log in with exicting name this will be trown out
    if (existingUser) return { error: 'Username is taken' }
    
    //if the user name dont have any conflicts the new user will be created in the user array
    const user = { id, name, room }

    users.push(user)

    return { user }
}


const removeUser = (id) => {
    // Finding the specific id of user.
    const index = users.findIndex((user) => user.id === id)

    //checking if user excist if so remove from user array
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
} 

//if user excist it will be returned in the getUser variable
const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room) 

module.exports = { addUser, removeUser, getUser, getUsersInRoom }
