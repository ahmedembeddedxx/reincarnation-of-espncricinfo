import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteTeamForm({ onClose }) {
    const [teamId, setTeamId] = useState('');

    const handleDelete = async () => {
        try {
            // Send a POST request to delete the team
            await axios.post('/api/deleteteam', { id: teamId });
            // Notify the user or close the form
            onClose();
        } catch (error) {
            console.error('Error deleting team:', error);
            // Handle the error
        }
    };

    return (
        <div>
            <h3>Delete Team</h3>
            <label className='CrudLabels'>Enter the Team ID:</label>
            <input
                type="text"
                value={teamId}
                className='CrudInputs'
                onChange={(e) => setTeamId(e.target.value)}
            />
            <br/>
            <button type="submit" onClick={handleDelete} className='b2' style={{fontSize: '15px'}}>Confirm Delete</button>
        </div>
    );
}
