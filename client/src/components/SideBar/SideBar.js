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
            <h5>
              {allOpenRooms.map(( room , index) => (
              //  <p key={room} className="activeItem">
               // {room} 
                <p key={index} className="activeItem">
                {room} 
              </p>))}
            </h5>
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
          <div className="activeContainer">
           <h4>People in room:</h4>
            <h5>
              {users.map(( { name } , index) => (
              <div key={index} className="activeItem">
                {name}
              </div>))}
            </h5>
          </div>
        </div>
      )
      : null 
      }

  </div>
  );
};

export default SideBar;