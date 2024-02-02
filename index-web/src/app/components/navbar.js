import React from 'react';
import { FaHome, FaSearch, FaCalendarAlt, FaFileAlt, FaUser, FaCog } from 'react-icons/fa'; 

function Navbar({ darkMode }) {
    console.log("Is Dark Mode:", darkMode);
    
    return (
        <div className={`navbar-hover ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="navbar-icons-container">
            <div className="flex flex-col items-center space-y-10 my-20">
              <NavbarIcon icon={<FaHome size="24" />} darkMode={darkMode} /> 
              <NavbarIcon icon={<FaSearch size="24" />} darkMode={darkMode} /> 
              <NavbarIcon icon={<FaCalendarAlt size="24" />} darkMode={darkMode} /> 
              <NavbarIcon icon={<FaFileAlt size="24" />} darkMode={darkMode} /> 
              <NavbarIcon icon={<FaUser size="24" />} darkMode={darkMode} /> 
            </div>

            <div className="flex items-center justify-center mb-10">
              <NavbarIcon icon={<FaCog size="24" />} darkMode={darkMode} /> 
            </div>
          </div>
        </div>
    );
}

function NavbarIcon({ icon, darkMode }) {
    return (
        <div className={`navbar-icon ${darkMode ? 'text-white' : 'text-gray-900'}`}> 
            {icon}
        </div>
    );
}

export default Navbar;
