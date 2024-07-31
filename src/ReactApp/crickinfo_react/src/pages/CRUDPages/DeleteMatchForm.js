import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteMatchForm({ onClose }) {
    const [matchId, setMatchId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!matchId) {
            return; // Don't submit if match ID is empty
        }
        try {
            await axios.post('/api/deletematch', { id: matchId });
            console.log('Match ID sent for deletion:', matchId);
            setMatchId('');
            onClose();
        } catch (error) {
            console.error('Error deleting match:', error);
        }
    };

    return (
        <div>
            <h3>Delete Match</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='CrudLabels'>Enter the Match ID: </label>
                    <input
                        type="number"
                        className='CrudInputs'
                        value={matchId}
                        onChange={(e) => setMatchId(e.target.value)}
                    />
                </div>
                <br/>
                <button type="submit" onClick={handleSubmit} className='b2' style={{fontSize: '15px'}}>Confirm Delete</button>
            </form>
        </div>
    );
}
