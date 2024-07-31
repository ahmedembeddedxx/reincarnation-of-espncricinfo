import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteSeriesForm({ onClose }) {
    const [seriesId, setSeriesId] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!seriesId) {
            return; // Don't submit if series ID is empty
        }
        try {
            // Send the series ID to the backend for deletion
            await axios.post('/api/deleteseries', { id: seriesId });
            console.log('Series ID sent for deletion:', seriesId);
            // Reset series ID field after submitting to the backend
            setSeriesId('');
            // Close the form
            onClose();
        } catch (error) {
            console.error('Error deleting series:', error);
            // Handle the error
        }
    };

    return (
        <div>
            <h3>Delete Series</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='CrudLabels'>Enter the Series ID: </label>
                    <input
                        type="number"
                        value={seriesId}
                        className='CrudInputs'
                        onChange={(e) => setSeriesId(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit} className='b2' style={{fontSize: '15px'}}>Confirm Delete</button>
            </form>
        </div>
    );
}
