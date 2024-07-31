import React, { useState } from 'react';
import './App.css';
import './dark-mode.css'
import Headerer from './components/Headerer';
import Navigation from './components/Navigation';
import Admin from './pages/Admin';
import Players from './pages/Players';
import Series from './pages/Series';
import Updates from './pages/Updates';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Login from './pages/Login'; // Assume you have a Login component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const handleLogin = () => {
    setLoggedIn(true);
    setCurrentPage('admin');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  let pageToShow;
  if (!loggedIn) {
    pageToShow = <Login onLogin={handleLogin} />;
  } else {
    switch (currentPage) {
      case 'admin':
        pageToShow = <Admin />;
        break;
      case 'players':
        pageToShow = <Players />;
        break;
      case 'series':
        pageToShow = <Series />;
        break;
      case 'updates':
        pageToShow = <Updates />;
        break;
      case 'matches':
        pageToShow = <Matches />;
        break;
      case 'teams':
        pageToShow = <Teams />;
        break;
      default:
        pageToShow = null;
    }
  }

  return (
    <>
      <Headerer/>
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {pageToShow}
    </>
  );
}

export default App;
