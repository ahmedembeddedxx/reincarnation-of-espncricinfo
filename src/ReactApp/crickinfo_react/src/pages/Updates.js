import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Updates() {
    const [newsData, setNewsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNewsData, setFilteredNewsData] = useState([]);

    useEffect(() => {
        // Fetch news data from the backend API
        axios.get('http://127.0.0.1:5000/api/news')
            .then(response => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setNewsData(response.data);
                    // Initially set the filtered news data to the fetched data
                    setFilteredNewsData(response.data);
                } else {
                    console.error('API response data is empty or not an array.');
                }
            })
            .catch(error => {
                console.error('Error fetching news data:', error);
            });
    }, []);

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter news data based on the search query
    useEffect(() => {
        const filteredData = newsData.filter(newsItem =>
            newsItem.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            newsItem.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            newsItem.playername.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNewsData(filteredData);
    }, [searchQuery, newsData]);

    return (
        <div>
            <h3>Updates Data</h3>
            <input
                type="text"
                id="search"
                placeholder="Find News..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div id="FormTable">
                {/* Map through the filtered news data and render each news item */}
                <table> 
                    <tbody  style={{textAlign: 'center'}}>
                        {filteredNewsData.map((newsItem, index) => (
                            <tr key={index}  style={{border: '3px var(--greyish)'}}>
                                <td style={{textAlign: 'left'}}>
                                    <h2>{newsItem.headline}</h2>
                                    <p className="news">{newsItem.text}</p>
                                    <div style={{fontSize: 'small', textDecoration: 'underline'}}>
                                        <p style={{textAlign: 'right'}}><strong > {newsItem.date}</strong></p>
                                        <p style={{textAlign: 'right'}}><strong>@{newsItem.playername}</strong></p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />
            <hr />
            <footer>
                <p>ESPNCricInfo Reincarnated</p>
                <p>Copyright 2024. All Rights Reserved.</p>
                <a href="https://github.com/ahmedembeddedx/the-reincarnation-of-espncricinfo/">
                    <img src="https://cdn-icons-png.freepik.com/512/919/919847.png?ga=GA1.1.1925836337.1709750745&" alt="" height="40" />
                </a>
            </footer>
        </div>
    );
}
