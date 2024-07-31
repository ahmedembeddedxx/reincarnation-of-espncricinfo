import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMatchForm({ onClose }) {
    const [matchId, setMatchId] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('');
    const [newValue, setNewValue] = useState('');
    const [columns, setColumns] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch all column names from the backend for MatchData
        const fetchColumns = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/getmatchcolumns');
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
        } else if (name === 'matchId') {
            setMatchId(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!matchId || !selectedColumn || !newValue) {
            setError('Please provide all fields');
            return;
        }
        try {
            // Send data to backend for updating match column
            const response = await axios.post('http://127.0.0.1:5000/api/updatematchcolumns', {
                columnName: selectedColumn,
                id: matchId,
                newValue: newValue
            });
            console.log(response.data);
            setSuccess('Match updated successfully');
            onClose(); // Close the popup after successful update
        } catch (error) {
            console.error('Error updating match:', error);
            setError('Failed to update match');
        }
    };

    return (
        <div>
            <h3>Update Match</h3>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div>
                    <label className='CrudLabels'>Match ID:</label>
                    <input type="number" className='CrudInputs' min={1} name="matchId" value={matchId} onChange={handleChange} />
                </div>
                <div>
                    <label className='CrudLabels'>Attribute:</label>
                    <select name="column" style={{width: '50%'}} className='CrudInputs' value={selectedColumn} onChange={handleChange}>
                        <option value="">Attribute</option>
                        {columns && columns.map((column, index) => (
                            <option key={index} value={column}>{column}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='CrudLabels'>Updated Attribute:</label>
                    <input type="text" className='CrudInputs' name="newValue" value={newValue} onChange={handleChange} />
                </div>
                <button type="submit" style={{fontSize: '15px'}} className='b2'>Update Match</button>
            </form>
        </div>
    );
}
