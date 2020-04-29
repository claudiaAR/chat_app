import React from 'react';
import './SideBar.css';

{/*  allClosedRooms  */}
const SideBar = ({ users, allRooms }) => { 


 
  return (
  
  <div className="sidebarContainer">


    {
      allRooms
      ? (
        <div>
        <h4>Open rooms:</h4>
          <div className="activeContainer">
            <div>
              {allRooms.map(({ rooms }) => (
              //  <p key={room} className="activeItem">
               // {room} 
                <p key={rooms} className="activeItem">
                {allRooms} 
              </p>))}
            </div>
          </div>
        </div>
      )
      : null 
    }
  


    <h4>Private rooms:</h4>
     {/*{
      allClosedRooms
      ? (
        <div>
          <div className="activeContainer">
            <div>
              {allClosedRooms.map(({ allClosedRooms }) => (
                <p key={allClosedRooms} className="activeItem">
                {allClosedRooms}
              </p>))}
            </div>
          </div>
        </div>
      )
      : null } */}

   
    {
      users
      ? (
        <div>
          <div className="activeContainer">
           <h4>People in room:</h4>
            <h5>
              {users.map(({ name }) => (
              <div key={name} className="activeItem">
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