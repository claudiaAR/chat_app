import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';

import './SideBar.css';

const SideBar = ({ users, room }) => (
  <div className="sidebarContainer">
    <h1>Open rooms:</h1>
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
                  </div>
                ))}
             </h2>
            </div>
          </div>
        )
      : null
    } 
  </div>
);

export default SideBar;