import React from 'react';
import './SpecialEffectsButton.css'; // Import CSS file for styles

export default function SpecialEffectsButton() {
  // Function to handle the button click event
  const handleClick = () => {
    // Create a balloon element
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    document.body.appendChild(balloon);

    // Remove the balloon element after animation completes
    balloon.addEventListener('animationend', () => {
      balloon.remove();
    });
  };

  return (
    <button className="special-effects-button" onClick={handleClick}>
      Mystery Button
    </button>
  );
}
