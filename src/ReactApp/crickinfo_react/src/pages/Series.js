import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Series() {
    const [seriesData, setSeriesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSeriesData();
    }, []);

    const fetchSeriesData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/series');
            setSeriesData(response.data);
        } catch (error) {
            console.error('Error fetching series data:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const renderCellValue = (value) => {
        return value ? value : 'N/A';
    };
    const filteredSeries = seriesData.filter(series =>
        series.SeriesName.toLowerCase().includes(searchQuery.toLowerCase())||
        series.SeriesVenue.toLowerCase().includes(searchQuery.toLowerCase())||
        series.SeriesStartDate.toLowerCase().includes(searchQuery.toLowerCase())||
        series.SeriesEndDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h3>Series Data</h3>
            <input
                type="text"
                id="search"
                placeholder="Find Series..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div id="FormTable">
                <table>
                    <thead>
                        <tr>
                            <th>Series Name</th>
                            <th>Series ID</th>
                            <th>Venue ID</th>
                            <th>Series Start Date</th>
                            <th>Series End Date</th>
                            <th>Series Venue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSeries.map(series => (
                            <tr key={series.SeriesID}>
                                <td>{renderCellValue(series.SeriesName)}</td>
                                <td>{renderCellValue(series.SeriesID)}</td>
                                <td>{renderCellValue(series.VenueID)}</td>
                                <td>{renderCellValue(series.SeriesStartDate)}</td>
                                <td>{renderCellValue(series.SeriesEndDate)}</td>
                                <td>{renderCellValue(series.SeriesVenue)}</td>
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
                    <img src="https://cdn-icons-png.freepik.com/512/919/919847.png" alt="GitHub" height="40"/>
                </a>
            </footer>
        </div>
    );
}
