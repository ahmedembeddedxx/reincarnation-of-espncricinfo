import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdatePlayerForm({ onClose }) {
    const [playerId, setPlayerId] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('');
    const [newValue, setNewValue] = useState('');
    const [columns, setColumns] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch all column names from the backend
        const fetchColumns = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/getplayercolumns');
                setColumns(response.data.columns);
            } catch (error) {
                console.error('Error fetching columns:', error);
                setError('Failed to fetch columns');
            }
        };

        // Call the function to fetch columns when component mounts
        fetchColumns();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'column') {
            setSelectedColumn(value);
        } else if (name === 'newValue') {
            setNewValue(value);
        } else if (name === 'playerId') {
            setPlayerId(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playerId || !selectedColumn || !newValue) {
            setError('Please provide all fields');
            return;
        }
        try {
            // Send data to backend for updating player column
            const response = await axios.post('http://127.0.0.1:5000/api/updateplayercolumns', {
                columnName: selectedColumn,
                id: playerId,
                newValue: newValue
            });
            console.log(response.data);
            setSuccess('Player updated successfully');
            onClose(); // Close the popup after successful update
        } catch (error) {
            console.error('Error updating player:', error);
            setError('Failed to update player');
        }
    };

    return (
        <div>
            <h3>Update Player</h3>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div>
                    <label className='CrudLabels'>Player ID:</label>
                    <input className='CrudInputs' type="number" min={1} name="playerId" value={playerId} onChange={handleChange} />
                </div>
                <div>
                    <label className='CrudLabels'>Attribute:</label>
                    <select style={{width:'50%'}} className='CrudInputs' name="column" value={selectedColumn} onChange={handleChange}>
                        <option value="">Attribute</option>
                        {columns && columns.map((column, index) => (
                            <option key={index} value={column}>{column}</option>
                        ))}
                    </select>
            </div>
                <div>
                    <label className='CrudLabels'>Updated Attribute:</label>
                    <input className='CrudInputs' type="text" name="newValue" value={newValue} onChange={handleChange} />
                </div>
                <button type="submit"style={{fontSize: '15px'}}  className='b2'>Update Player</button>
            </form>
        </div>
    );
}
