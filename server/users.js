//This file are handling all helper functions for our users

const users = []

let roomsAndPassword =  {
      
}

// Add user to the users array.
const addUser = ({ id, name, room, password }) => {
    // This makes the string all lowercase and no whitespaces
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    // If the user name dont have any conflicts the new user will be created in the user array
    const user = { id, name, room }

    // Checking if the username is avalible.
    const existingUser = users.find((user) => user.room === room && user.name === name )

     // Validation of name and room inputs.
     if(!name || !room) return { error: 'Username and room are required.' };

     // If the user try to log in with exicting name this will be trown out
     if (existingUser) return { error: 'Username is taken' }
 

        // TODO leave remove user if already in a room
        // remove room if empty

    // check if room doesn't exists
            // create room
    if (roomsAndPassword[room] === undefined) {
        roomsAndPassword[room] = { password: password }
        users.push(user)
    } // room exists but no password 
    else if (roomsAndPassword[room].password.length === 0) {
        users.push(user)
    } // room exists and check password 
    else if (roomsAndPassword[room].password === password) {
        users.push(user)
    } else {
        return { error: "Wrong password"};
    }

    console.log("roooms", roomsAndPassword);
    
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
// let passwords = user.password
// const addPassword = (password) => {
//     // Finding the specific id of user in array.
//     const index = passwords.findIndex((passwords) => passwords === room.password)

//     // If the user exist, remove the user from array.
//     if (index === password) {
//         return passwords.push(index, 1)[0]
//     }
//     console.log(addPassword)
// } 


const getAllOpenRooms = () => {
    return Object.entries(roomsAndPassword).filter(entry => entry[1].password.length === 0).map(entry => entry[0])
}

const getAllClosedRooms = () => {
    return Object.entries(roomsAndPassword).filter(entry => entry[1].password.length).map(entry => entry[0])
}



//if user excist it will be returned in the getUser variable
const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room) 

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getAllOpenRooms, getAllClosedRooms }
