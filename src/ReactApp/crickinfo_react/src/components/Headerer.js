import React, { useState, useEffect } from 'react';

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setCurrentDateTime(new Date());
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[currentDateTime.getDay()];

  return (
    <div>
      <div id="header">
        <div id="logo">
          <p>ESPNCricInfo Reincarnated</p>
        </div>
        <div id="date">
          <p>{currentDay}, {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
