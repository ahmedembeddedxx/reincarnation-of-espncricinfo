import React, { useState } from 'react';
import axios from 'axios';

export default function AddMatchForm({ onClose }) {
    // State variables for form inputs
    const [team1ID, setTeam1ID] = useState('');
    const [team2ID, setTeam2ID] = useState('');
    const [date, setDate] = useState('');
    const [venueID, setVenueID] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            _Team1ID: team1ID,
            _Team2ID: team2ID,
            _Date: date,
            _VenueID: venueID
        };

        try {
            // Send a POST request to the backend
            await axios.post('/api/addmatches', data);
            // Notify the user or close the form
            onClose();
        } catch (error) {
            console.error('Error adding series:', error);
            // Handle the error
        }
    };

    return (
        <div>
            <h3>Add Match</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='CrudLabels'>Team 1 ID: </label>
                    <input
                        className='CrudInputs'
                        type="number"
                        value={team1ID}
                        onChange={(e) => setTeam1ID(e.target.value)}
                    />
                </div>
                <div>
                    <label className='CrudLabels'>Team 2 ID: </label>
                    <input
                        type="number"
                        className='CrudInputs'
                        value={team2ID}
                        onChange={(e) => setTeam2ID(e.target.value)}
                    />
                </div>
                <div>
                    <label className='CrudLabels'>Date: </label>
                    <input
                        type="date"
                        style={{width: '50%'}}
                        className='CrudInputs'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className='CrudLabels'>Venue ID: </label>
                    <input
                        
                        type="number"
                        className='CrudInputs'
                        value={venueID}
                        onChange={(e) => setVenueID(e.target.value)}
                    />
                </div>
                <button type="submit" style={{fontSize: '15px'}} className='b2'>Add Match</button>
            </form>
        </div>
    );
}
