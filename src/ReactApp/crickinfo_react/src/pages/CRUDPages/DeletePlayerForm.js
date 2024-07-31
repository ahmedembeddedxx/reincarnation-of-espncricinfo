import React, { useState } from 'react';
import axios from 'axios';

export default function DeletePlayerForm({ onClose }) {
    const [playerId, setPlayerId] = useState('');

    const handleDelete = async () => {
        try {
            // Send a POST request to delete the player
            await axios.post('/api/deleteplayer', { id: playerId });
            // Notify the user or close the form
            onClose();
        } catch (error) {
            console.error('Error deleting player:', error);
            // Handle the error
        }
    };

    return (
        <div>
            <h3>Delete Player</h3>
            <label className='CrudLabels'>Enter the Player ID:</label>
            <input
                type="text"
                value={playerId}
                className='CrudInputs'
                onChange={(e) => setPlayerId(e.target.value)}
            />
            <br/>
            <button type="submit" onClick={handleDelete} className='b2' style={{fontSize: '15px'}}>Confirm Delete</button>
        </div>
    );
}
