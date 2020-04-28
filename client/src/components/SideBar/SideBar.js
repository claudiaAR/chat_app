import React from 'react';
import './SideBar.css';


const SideBar = ({ users, room, allRooms }) => {

 
  return (
  
  <div className="sidebarContainer">

    <h1>Open rooms:</h1>
    {
      room
      ? (
        <div>
          <div className="activeContainer">
            <div>
              {allRooms.map(({ room }) => (
                <p key={allRooms} className="activeItem">
                {allRooms}
              </p>))}
            </div>
          </div>
        </div>
      )
      : null }

    <h1>Private rooms:</h1>
    {
      users
      ? (
        <div>
          <h1>People currently chatting:</h1>
          <div className="activeContainer">
            <h2>
              {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
              </div>))}
            </h2>
          </div>
        </div>
      )
      : null 
      }

  </div>);
};

export default SideBar;