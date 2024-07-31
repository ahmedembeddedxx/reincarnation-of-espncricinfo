import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewsForm({ onClose }) {
    const [headline, setHeadline] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare data to be sent to backend
        const newsData = {
            _Headline: headline,
            _Text: text
        };

        try {
            // Send POST request to the backend API
            const response = await axios.post('http://127.0.0.1:5000/api/addnews', newsData);
            // Handle response if necessary
            if (response.status === 201) {
                onClose();
            }
        } catch (error) {
            console.error('Error adding news:', error);
            alert('Failed to add news');
        }
    };

    return (
        <div>
            <h3>Add News</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='CrudLabels'>Headline:</label>
                    <input className='CrudInputs'type="text" style={{width: '90%', height:'100px'}} value={headline} onChange={(e) => setHeadline(e.target.value)} required />
                </div>
                <div>
                    <label className='CrudLabels'>Text:</label>
                    <input className='CrudInputs' style={{width: '90%', height:'100px'}}  value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <button type="submit" style={{fontSize: '15px'}} className='b2'>Add News</button>
            </form>
        </div>
    );
}

