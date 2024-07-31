import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupsTeam from '../popUpsPages/PopupsTeam';

export default function Teams() {
    // State to store the fetched team data
    const [teamsData, setTeamsData] = useState([]);

    // State for the search query
    const [searchQuery, setSearchQuery] = useState('');

    // State to manage the selected team and popup open status
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Fetch team data from the API endpoint on component mount
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/teams')
            .then(response => {
                console.log('API response:', response.data);
                
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setTeamsData(response.data);
                } else {
                    console.error('API response data is empty or not an array.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered teams based on the search query
    const filteredTeams = teamsData.filter(team =>
        team.TeamName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to open the popup
    const openPopup = (team) => {
        setSelectedTeam(team);
        setIsPopupOpen(true);
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedTeam(null);
    };
    const renderCellValue = (value) => {
        return value ? value : 'N/A';
    };

    return (
        <div>
            <h3>Teams Data</h3>
            <input
                type="text"
                id="search"
                placeholder="Find Team..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div id="FormTable">
                <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Team ID</th>
                            <th>Home Ground</th>
                            <th>Abbreviation</th>
                            <th>Nickname</th>
                            <th>Upcoming Fixture Date</th>
                            <th>Upcoming Series Name</th>
                            <th>Wins</th>
                            <th>Draws</th>
                            <th>Losses</th>
                            <th>Ranking Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.map(team => (
                            <tr key={team.TeamID}>
                                <td onClick={() => openPopup(team)} className='hover-on-data'>
                                {renderCellValue(team.TeamName)}
                                </td>
                                <td>{renderCellValue(team.TeamID)}</td>
                                <td>{renderCellValue(team.HomeGroundID)}</td>
                                <td>{renderCellValue(team.Abbreviation)}</td>
                                <td>{renderCellValue(team.Nickname)}</td>
                                <td>{renderCellValue(team.UpcomingFixtureID)}</td>
                                <td>{renderCellValue(team.UpcomingSeriesID)}</td>
                                <td>{renderCellValue(team.Wins)}</td>
                                <td>{renderCellValue(team.Draws)}</td>
                                <td>{renderCellValue(team.Losses)}</td>
                                <td>{renderCellValue(team.RankingPoints)}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup for displaying selected team */}
            <Popup
                open={isPopupOpen}
                onClose={closePopup}
                modal
                closeOnDocumentClick
                contentStyle={{
                    padding: '20px',
                    fontFamily: 'monospace',
                    width: '50%',
                    backgroundColor: 'var(--whitish)', // Use CSS variable here
                    height: '600px',
                    display: 'grid',
                    borderRadius: '10px',
                    fontSize: 'large',
                    margin: '0 auto',
                    border: '3px solid black'
                }}
            >
                <button onClick={closePopup} id="exitButton">x</button>
                {selectedTeam && <PopupsTeam team={selectedTeam} />}
            </Popup>

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
