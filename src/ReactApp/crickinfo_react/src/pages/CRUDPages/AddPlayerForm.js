import React, { useState } from 'react';
import axios from 'axios';

export default function AddPlayerForm({ onClose }) {
    // State to handle form inputs
    const [playerData, setPlayerData] = useState({
        _PlayerID: '',
        _TeamID: '',
        _Name: '',
        _Age: '',
        _Country: '',
        _RoleID: '',
        _BatAvg: '',
        _BattingStyle: '',
        _BatRuns: '',
        _HS: '',
        _Matches: '',
        _BatInnings: '',
        _BatSR: '',
        _Hundreds: '',
        _Fifties: '',
        _BowlAvg: '',
        _BowlingStyle: '',
        _Wickets: '',
        _BowlRuns: '',
        _BBF: '',
        _BowlInnings: '',
        _BowlSR: '',
        _FiveWickets: '',
        _TenWickets: '',
        _LastMatchID: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the API endpoint to insert the player data
            await axios.post('http://127.0.0.1:5000/api/addplayers', playerData);
            // Close the form after successful submission
            onClose();
        } catch (error) {
            console.error('Error inserting player:', error);
        }
    };

    return (
        <div>
            <h3>Insert Player</h3>
            <form onSubmit={handleSubmit}>
                {/* Render form inputs for each piece of player data */}
                {Object.keys(playerData).map((key) => (
                    <div key={key}>
                        <label className='CrudLabels'>
                            {key}:
                            <input
                                type="text"
                                className='CrudInputs'
                                name={key}
                                value={playerData[key]}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" style={{fontSize: '15px'}} className='b2'>Add Player</button>
            </form>
        </div>
    );
}
