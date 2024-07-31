import React, { useState } from 'react';


import "../dark-mode.css"


export default function Navigation({ onNavigate, currentPage }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const setDarkMode = () =>{
    document.querySelector("body").setAttribute("data-theme", "dark")
  };
  const setLightMode = () =>{
    document.querySelector("body").setAttribute("data-theme", "light")
  };
  const toggleMode = (e) => {
    // Toggle the state of isDarkMode
    if (e.target.checked){
      setDarkMode();
      e.target.checked = false;
    } 
    else{
      setLightMode();
      e.target.checked = true;
    } 
    setIsDarkMode(prevMode => !prevMode);
    
  };
  return (
    <div className={`general_align ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={() => onNavigate('updates')} className='b1' id="Updates">Updates</button>
      <button onClick={() => onNavigate('players')} className='b1' id="Players">Players</button>
      <button onClick={() => onNavigate('teams')} className='b1' id="Teams">Teams</button>
      <button onClick={() => onNavigate('matches')} className='b1' id="Matches">Matches</button>
      <button onClick={() => onNavigate('series')}className='b1' id="Series">Series</button>
      <button onClick={() => onNavigate('admin')} className='b1' id="Admin">Admin</button>
      {/* Button for toggling the current mode */}
      <button onClick={toggleMode} className='b1' id="ToggleMode">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>        
    </div>

  );
}
