//This file are handling all helper functions for our users

const users = []


// Add user to the users array.
const addUser = ({ id, name, room, password}) => {
    // This makes the string all lowercase and no whitespaces
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    password = password.trim().toLowerCase()
    
    // Checking if the username is free.
    const existingUser = users.find((user) => user.room === room && user.name === name )
    // const closedRooms = users.find((password) => user.room === room && user.password === password )
    

    // Validation of name and room inputs.
    if(!name || !room) return { error: 'Username and room are required.' };

    // If the user try to log in with exicting name this will be trown out
    if (existingUser) return { error: 'Username is taken' }

//    if(closedRooms) {
//         console.log(closedRooms)
//     }
     
    // If the user name dont have any conflicts the new user will be created in the user array
    const user = { id, name, room, password }

    users.push(user)

    return { user }
    
    
}

// Remove user from the users array.
const removeUser = (id) => {
    // Finding the specific id of user in array.
    const index = users.findIndex((user) => user.id === id)

    // If the user exist, remove the user from array.
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
} 

//if user excist it will be returned in the getUser variable
const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room) 

module.exports = { addUser, removeUser, getUser, getUsersInRoom }
