import React from 'react';
import './SideBar.css';


const SideBar = ({ users, allOpenRooms, allClosedRooms }) => { 

  return (
  
  <div className="sidebarContainer">
    {
      allOpenRooms
      ? (
        <div>
        <h4>Open rooms:</h4>
          <div className="activeContainer">
            <div>
              {allOpenRooms.map(( room , index) => (
                <p key={index} className="activeItem">
                {room} 
              </p>))}
            </div>
          </div>
        </div>
      )
      : null 
    }
  


    <h4>Private rooms:</h4>
     {
      allClosedRooms
      ? (
        <div>
          <div className="activeContainer">
            <div>
              {allClosedRooms.map(( room , index) => (
                <p key={index} className="activeItem">
                {room}
              </p>))}
            </div>
          </div>
        </div>
      )
      : null }

   
    {
      users
      ? (
        <div>
           <h4>People in room:</h4>
          <div className="activeContainer">
            <div>
              {users.map(( { name } , index) => (
              <p key={index} className="activeItem">
                {name}
              </p>))}
            </div>
          </div>
        </div>
      )
      : null 
      }

  </div>
  );
};

export default SideBar;